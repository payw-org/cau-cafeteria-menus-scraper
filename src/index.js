const puppeteer = require('puppeteer')
const dayjs = require('dayjs')
const { PendingXHR } = require('pending-xhr-puppeteer')

/**
 * @param {Object} config
 * @param {string} config.id
 * @param {string} config.pw
 * @param {number} config.days
 */
async function cauCafeteriaMenusScraper(config) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  const pendingXHR = new PendingXHR(page)
  const dateFormat = 'YYYY-MM-DD'
  const sel = {
    timeGroup: [
      '#P005 .nb-p-tab-sections header ol li:nth-child(1)',
      '#P005 .nb-p-tab-sections header ol li:nth-child(2)',
      '#P005 .nb-p-tab-sections header ol li:nth-child(3)'
    ],
    restaurant: '#P005 dl.nb-p-04-list-02',
    restaurantName: 'dt',
    meal: 'dd',
    mealInfo: {
      time: 'li:nth-child(1)',
      title: 'li:nth-child(2)',
      price: 'li:nth-child(3)'
    },
    menuItemContainer: '.nb-p-04-detail .nb-p-04-03',
    menuItem: '.nb-p-04-detail .nb-p-04-03 p',
    date: '#P005 .nb-p-time-select .nb-p-time-select-current',
    nextDay: '#P005 .nb-p-time-select .nb-p-time-select-next'
  }

  page.setViewport({
    width: 375,
    height: 667
  })

  await page.goto('https://mportal.cau.ac.kr/common/auth/SSOlogin.do')

  // Login
  await page.waitForNavigation({
    waitUntil: 'load'
  })
  await page.waitForSelector('#txtUserID')
  await page.evaluate(
    (evId, evPw) => {
      document.querySelector('#txtUserID').value = evId
      document.querySelector('#txtPwd').value = evPw
    },
    config.id,
    config.pw
  )
  await page.click('.btn-login')

  // Define data
  let scrapedData = {
    campus: 'seoul',
    days: []
  }

  // Wait until food section appears
  try {
    await page.waitForNavigation({
      waitUntil: 'load'
    })
    await page.waitForSelector('#P005')
    await pendingXHR.waitForAllXhrFinished()
  } catch (error) {
    await page.close()
    await browser.close()
    return Promise.reject(new Error('Login timeout'))
  }

  // Loop for the passed days count
  const days = config.days ? config.days : 5
  for (let i = 0; i < days; i += 1) {
    const dateString = await page.$eval(sel.date, elm => {
      return elm.textContent.trim()
    })

    const dayData = {
      date: dayjs(dateString).format(dateFormat),
      breakfast: [],
      lunch: [],
      supper: []
    }

    for (let i = 0; i < 3; i += 1) {
      // Click time group(breakfast, lunch, supper)
      await page.click(sel.timeGroup[i])

      // Wait AJAX data load
      await pendingXHR.waitForAllXhrFinished()

      // Restaurants
      const restaurantElms = await page.$$(sel.restaurant)
      for (let j = 0; j < restaurantElms.length; j += 1) {
        const aRestElm = restaurantElms[j]
        const restaurantName = await aRestElm.$eval(sel.restaurantName, elm => {
          return elm.textContent.trim()
        })

        // Declare restaurant data
        const restaurantData = {
          name: restaurantName,
          meals: []
        }

        // Meals
        const mealElms = await aRestElm.$$(sel.meal)
        for (let k = 0; k < mealElms.length; k += 1) {
          const aMealElm = mealElms[k]
          const mealTime = await aMealElm.$eval(sel.mealInfo.time, elm => {
            return elm.textContent.trim()
          })
          const mealTitle = await aMealElm.$eval(sel.mealInfo.title, elm => {
            return elm.textContent.trim()
          })
          const maelPrice = await aMealElm.$eval(sel.mealInfo.price, elm => {
            return elm.textContent.trim()
          })

          // Meals
          const menusCount = await aMealElm.$$eval(sel.menuItem, menuElms => {
            return menuElms.length
          })

          let menus = []
          if (menusCount > 0) {
            // Multiple menus
            menus = await aMealElm.$$eval(sel.menuItem, menuElms => {
              const menus = []
              for (let l = 0; l < menuElms.length; l += 1) {
                menus.push(menuElms[l].textContent.trim())
              }
              return menus
            })
          } else {
            // Only single menu
            const singleMenuName = await aMealElm.$eval(
              sel.menuItemContainer,
              elm => {
                return elm.textContent.trim()
              }
            )
            menus.push(singleMenuName)
          }

          const mealData = {
            title: mealTitle,
            time: mealTime,
            price: maelPrice,
            menus
          }

          restaurantData.meals.push(mealData)
        }

        if (i === 0) {
          dayData.breakfast.push(restaurantData)
        } else if (i === 1) {
          dayData.lunch.push(restaurantData)
        } else if (i === 2) {
          dayData.supper.push(restaurantData)
        }
      }
    }

    scrapedData.days.push(dayData)

    // Click next day
    await page.click(sel.nextDay)
    await pendingXHR.waitForAllXhrFinished()
  }

  // Close the page
  await page.close()

  // Close the browser
  await browser.close()

  return scrapedData
}

module.exports = {
  CCMS: cauCafeteriaMenusScraper
}
