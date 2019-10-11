const account = require('./account')
const { CCMS } = require('./dist/index')

CCMS({
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
