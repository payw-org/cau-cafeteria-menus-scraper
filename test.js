const account = require('./account')
const { CAUFS } = require('./build/index')

CAUFS({
  id: account.id,
  pw: account.pw
})
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
  .catch(e => {
    console.log(e)
  })
