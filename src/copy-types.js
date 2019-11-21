const fs = require('fs')

fs.copyFile('./types/index.d.ts', './dist/index.d.ts', err => {
  if (err) throw err
  console.log('index.d.ts was copied to dist directory')
})
