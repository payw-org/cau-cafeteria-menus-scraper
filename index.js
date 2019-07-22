const puppeteer = require('puppeteer')
const account = require('./account')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // 4.7 inch iPhone
  page.setViewport({
    width: 375,
    height: 667
  })

  // login
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

  await page.click('.btn-login')
  await page.waitForSelector('#P005 .nb-p-04-list-02 .nb-font-13')
  // await page.screenshot({ path: 'output/screenshot.png' })

  let info = await page.evaluate(() => {
    let info = []
    document
      .querySelectorAll('#P005 .nb-p-04-list-02')
      .forEach(restaurantElm => {
        let restaurantInfo = {
          restaurantName: '',
          foods: [
            {
              time: '',
              title: '',
              price: 0,
              menus: []
            }
          ]
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

          restaurantInfo.foods.push(food)
        })

        info.push(restaurantInfo)
      })

    return info
  })

  console.log(JSON.stringify(info, null, 2))

  await browser.close()
})()
