const fs = require('fs')
const dir = './dist'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
