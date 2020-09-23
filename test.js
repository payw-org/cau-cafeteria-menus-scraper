const account = require('./account')
const { CCMS } = require('./src/index')

CCMS({
  id: account.id,
  pw: account.pw,
  days: 3
})
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
  .catch(e => {
    console.log(e)
  })
