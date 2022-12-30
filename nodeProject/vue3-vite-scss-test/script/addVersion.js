const path = require('path')
const fs = require('fs-extra')

const addVersion = function (code) {
  const filePath = path.resolve(__dirname, '../dist/assets/index.17afa793.js')
  console.log('file path: ', filePath)
  fs.readFile(filePath, 'utf8', function (err, file) {
    console.log('file: ', file)
    const result = file.replace(/_lazy.js/g, '_lazy.js?v=132')
    console.log('result: ', result)
    fs.writeFile(filePath, result, 'utf8', function (err) {
      console.log('write err: ', err)
    })
  })
  // return code.replace(/_lazy.js/g, '_lazy.js?v=132')
}
addVersion('11_lazy.js_11_lazy.js')
// console.log()
