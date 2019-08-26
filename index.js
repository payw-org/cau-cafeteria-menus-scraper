const puppeteer = require('puppeteer')
const account = require('./account')
const dayjs = require('dayjs')

module.exports = async function() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // 4.7 inch iPhone
  page.setViewport({
    width: 375,
    height: 667
  })

  await page.goto('https://mportal.cau.ac.kr/common/auth/SSOlogin.do')
  await page.waitForSelector('#txtUserID')

  await page.evaluate(
    (id, pw) => {
      document.querySelector('#txtUserID').value = id
      document.querySelector('#txtPwd').value = pw
    },
    account.id,
    account.pw
  )

  var nextDate = new Date()

  // Click login button
  await page.click('.btn-login')

  let data = []
  let awaitTime = 2000

  // Scrape 5 days including today
  for (var i = 0; i < 5; i++) {
    let mealsInDay = {
      date: dayjs(nextDate).format('YYYY-MM-DD'),
      today: {}
    }
    await page.waitForSelector('#P005 .nb-p-04-list-02 .nb-font-13')
    // await page.screenshot({ path: 'output/screenshot.png' })

    await page.click('.nb-p-04-list :nth-child(1) :nth-child(1)')
    await page.waitFor(awaitTime)
    let breakfast = await page.evaluate(() => {
      let info = []
      document
        .querySelectorAll('#P005 .nb-p-04-list-02')
        .forEach(restaurantElm => {
          let restaurantInfo = {
            restaurantName: '',
            meals: []
          }

          // get restaurant name
          restaurantInfo.restaurantName = restaurantElm
            .querySelector('.nb-font-13')
            .textContent.trim()

          restaurantElm.querySelectorAll('dd').forEach(foodElm => {
            let food = {
              time: '',
              title: '',
              price: 0,
              menus: []
            }

            let infoElms = foodElm.querySelectorAll('ul li')
            food.time = infoElms[0].textContent
            food.title = infoElms[1].textContent
            food.price = infoElms[2].textContent

            let infoE = foodElm.querySelectorAll(
              '.nb-p-04-detail .nb-p-04-03 p'
            )
            if (infoE.length === 0) {
              infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03')
              food.menus = infoE[0].textContent
            } else {
              infoE = foodElm
                .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
                .forEach(menuItem => {
                  food.menus.push(menuItem.textContent)
                })
            }

            restaurantInfo.meals.push(food)
          })

          info.push(restaurantInfo)
        })

      return info
    })

    await page.click('.nb-p-04-list :nth-child(2) :nth-child(1)')
    await page.waitFor(awaitTime)
    let lunch = await page.evaluate(() => {
      let lunch = []
      document
        .querySelectorAll('#P005 .nb-p-04-list-02')
        .forEach(restaurantElm => {
          let restaurantInfo = {
            restaurantName: '',
            meals: []
          }

          // get restaurant name
          restaurantInfo.restaurantName = restaurantElm
            .querySelector('.nb-font-13')
            .textContent.trim()

          restaurantElm.querySelectorAll('dd').forEach(foodElm => {
            let food = {
              time: '',
              title: '',
              price: 0,
              menus: []
            }

            let infoElms = foodElm.querySelectorAll('ul li')
            food.time = infoElms[0].textContent
            food.title = infoElms[1].textContent
            food.price = infoElms[2].textContent

            let infoE = foodElm.querySelectorAll(
              '.nb-p-04-detail .nb-p-04-03 p'
            )
            if (infoE.length === 0) {
              infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03')
              food.menus = infoE[0].textContent
            } else {
              infoE = foodElm
                .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
                .forEach(menuItem => {
                  food.menus.push(menuItem.textContent)
                })
            }

            restaurantInfo.meals.push(food)
          })

          lunch.push(restaurantInfo)
        })

      return lunch
    })

    await page.click('.nb-p-04-list :nth-child(3) :nth-child(1)')
    await page.waitFor(awaitTime)
    let dinner = await page.evaluate(() => {
      let dinner = []
      document
        .querySelectorAll('#P005 .nb-p-04-list-02')
        .forEach(restaurantElm => {
          let restaurantInfo = {
            restaurantName: '',
            meals: []
          }

          // get restaurant name
          restaurantInfo.restaurantName = restaurantElm
            .querySelector('.nb-font-13')
            .textContent.trim()

          restaurantElm.querySelectorAll('dd').forEach(foodElm => {
            let food = {
              time: '',
              title: '',
              price: 0,
              menus: []
            }

            let infoElms = foodElm.querySelectorAll('ul li')
            food.time = infoElms[0].textContent
            food.title = infoElms[1].textContent
            food.price = infoElms[2].textContent

            let infoE = foodElm.querySelectorAll(
              '.nb-p-04-detail .nb-p-04-03 p'
            )
            if (infoE.length === 0) {
              infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03')
              food.menus = infoE[0].textContent
            } else {
              infoE = foodElm
                .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
                .forEach(menuItem => {
                  food.menus.push(menuItem.textContent)
                })
            }

            restaurantInfo.meals.push(food)
          })

          dinner.push(restaurantInfo)
        })

      return dinner
    })

    // console.log(JSON.stringify(breakfast, null, 2))
    mealsInDay.today['breakfast'] = breakfast
    // console.log('-----------------------------')
    // console.log(JSON.stringify(lunch, null, 2))
    mealsInDay.today['lunch'] = lunch
    // console.log('-----------------------------')
    // console.log(JSON.stringify(dinner, null, 2))
    mealsInDay.today['dinner'] = dinner
    // console.log('-----------------------------')

    data.push(mealsInDay)

    nextDate.setDate(nextDate.getDate() + 1)
    await page.click('#P005 .nb-p-time-select .nb-p-time-select-next')
  }

  await browser.close()

  return data
}
