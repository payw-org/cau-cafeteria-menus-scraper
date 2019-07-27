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
  await page.click('.nb-p-04-list :nth-child(1) :nth-child(1)') 
  await page.waitFor(500)
  let info = await page.evaluate(() => {
    let info = []
    document
      .querySelectorAll('#P005 .nb-p-04-list-02')
      .forEach(restaurantElm => {
        let restaurantInfo = {
          restaurantName: '',
          foods: []
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

          let infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
          if(infoE.length === 0){
            infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03')
          food.menus = infoE[0].textContent
          }
          else{
            infoE = foodElm
            .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
            .forEach(menuItem => {
              food.menus.push(menuItem.textContent)
            })
          }

          restaurantInfo.foods.push(food)
        })

        info.push(restaurantInfo)
      })

    return info
  })


  await page.click('.nb-p-04-list :nth-child(2) :nth-child(1)') 
  await page.waitFor(500)
  let lunch = await page.evaluate(() => {
    let lunch = []
    document
      .querySelectorAll('#P005 .nb-p-04-list-02')
      .forEach(restaurantElm => {
        let restaurantInfo = {
          restaurantName: '',
          foods: []
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

          let infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
          if(infoE.length === 0){
            infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03')
          food.menus = infoE[0].textContent
          }
          else{
            infoE = foodElm
            .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
            .forEach(menuItem => {
              food.menus.push(menuItem.textContent)
            })
          }

          restaurantInfo.foods.push(food)
        })

        lunch.push(restaurantInfo)
      })

    return lunch
  })

  await page.click('.nb-p-04-list :nth-child(3) :nth-child(1)') 
  await page.waitFor(500)
  let dinner = await page.evaluate(() => {
    let dinner = []
    document
      .querySelectorAll('#P005 .nb-p-04-list-02')
      .forEach(restaurantElm => {
        let restaurantInfo = {
          restaurantName: '',
          foods: []
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

          let infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
          if(infoE.length === 0){
            infoE = foodElm.querySelectorAll('.nb-p-04-detail .nb-p-04-03')
          food.menus = infoE[0].textContent
          }
          else{
            infoE = foodElm
            .querySelectorAll('.nb-p-04-detail .nb-p-04-03 p')
            .forEach(menuItem => {
              food.menus.push(menuItem.textContent)
            })
          }

          restaurantInfo.foods.push(food)
        })

        dinner.push(restaurantInfo)
      })

    return dinner
  })

  console.log(JSON.stringify(info, null, 2))
  console.log("-----------------------------------------------------------------")
  console.log(JSON.stringify(lunch, null, 2))
  console.log("-----------------------------------------------------------------")
  console.log(JSON.stringify(dinner, null, 2))
  await browser.close()
})()
