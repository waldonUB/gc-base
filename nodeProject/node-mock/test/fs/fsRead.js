const fs = require('fs')
const path = require('path')
console.log(`__dirname`, __dirname)
let filePath = path.resolve(__dirname, '../../models/mock/testJson.json')
console.info(`path`, filePath)
fs.readFile(filePath, (res, err) => {
	console.log(`res`, res)
	console.log(`err`, err)
})
