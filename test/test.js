const CAUFoodScraper = require('../index')

CAUFoodScraper().then(data => {
  console.log(JSON.stringify(data, null, 2))
})
