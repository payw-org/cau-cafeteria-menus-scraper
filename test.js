const account = require('./account')
const cauFoodScraper = require('./dist/index').default

cauFoodScraper({
  id: account.id,
  pw: account.pw,
  days: 1
}).then(data => {
  console.log(JSON.stringify(data, null, 2))
})
