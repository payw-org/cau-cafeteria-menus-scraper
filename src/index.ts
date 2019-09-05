const puppeteer = require('puppeteer')
const dayjs = require('dayjs')

export interface Meal {
  time: string
  title: string
  price: string
  menus: string[]
}

export interface Food {
  name: string
  meals: Meal[]
}

export interface Day {
  date: Date
  breakfast: Food[]
  lunch: Food[]
  supper: Food[]
}

export type Data = Day[]

export default async function cauFoodScraper({
  id,
  pw,
  days = 5
}: {
  id: string
  pw: string
  days?: number
}): Promise<Data> {
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
    (evId, evPw) => {
      ;(document.querySelector('#txtUserID') as HTMLInputElement).value = evId
      ;(document.querySelector('#txtPwd') as HTMLInputElement).value = evPw
    },
    id,
    pw
  )

  var nextDate = new Date()

  // Click login button
  await page.click('.btn-login')

  // Delay method
  const delay = ms => {
    new Promise(resolve => setTimeout(resolve, ms))
  }

  let data = []
  let awaitTime = 2000

  // Scrape 5 days including today
  for (var i = 0; i < days; i++) {
    let mealsInDay: Day = {
      date: dayjs(nextDate).format('YYYY-MM-DD'),
      breakfast: [],
      lunch: [],
      supper: []
    }

    try {
      await page.waitForSelector('#P005 .nb-p-04-list-02 .nb-font-13', {
        timeout: 10000
      })
    } catch (error) {
      return Promise.reject(new Error('Login failed'))
    }

    // await page.screenshot({ path: 'output/screenshot.png' })

    await page.click('.nb-p-04-list :nth-child(1) :nth-child(1)')
    await page.waitFor(awaitTime)
    let breakfast = await page.evaluate(() => {
      let info = []
      document
        .querySelectorAll('#P005 .nb-p-04-list-02')
        .forEach(restaurantElm => {
          let restaurantInfo = {
            name: '',
            meals: []
          }

          // get restaurant name
          restaurantInfo.name = restaurantElm
            .querySelector('.nb-font-13')
            .textContent.trim()

          restaurantElm.querySelectorAll('dd').forEach(foodElm => {
            let food = {
              time: '',
              title: '',
              price: '0',
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
              food.menus.push(infoE[0].textContent)
            } else {
              foodElm
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
            name: '',
            meals: []
          }

          // get restaurant name
          restaurantInfo.name = restaurantElm
            .querySelector('.nb-font-13')
            .textContent.trim()

          restaurantElm.querySelectorAll('dd').forEach(foodElm => {
            let food = {
              time: '',
              title: '',
              price: '0',
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
              food.menus.push(infoE[0].textContent)
            } else {
              foodElm
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
    let supper = await page.evaluate(() => {
      let supper = []
      document
        .querySelectorAll('#P005 .nb-p-04-list-02')
        .forEach(restaurantElm => {
          let restaurantInfo = {
            name: '',
            meals: []
          }

          // get restaurant name
          restaurantInfo.name = restaurantElm
            .querySelector('.nb-font-13')
            .textContent.trim()

          restaurantElm.querySelectorAll('dd').forEach(foodElm => {
            let food = {
              time: '',
              title: '',
              price: '0',
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
              food.menus.push(infoE[0].textContent)
            } else {
              foodElm
                .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
                .forEach(menuItem => {
                  food.menus.push(menuItem.textContent)
                })
            }

            restaurantInfo.meals.push(food)
          })

          supper.push(restaurantInfo)
        })

      return supper
    })

    mealsInDay.breakfast = breakfast
    mealsInDay.lunch = lunch
    mealsInDay.supper = supper

    data.push(mealsInDay)

    nextDate.setDate(nextDate.getDate() + 1)
    await page.click('#P005 .nb-p-time-select .nb-p-time-select-next')
  }

  await browser.close()

  return data
}
