const account = require('./account')
const { CAUFS } = require('./dist/index')

CAUFS({
  id: account.id,
  pw: account.pw,
  days: 2
})
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
  .catch(e => {
    console.log(e)
  })
