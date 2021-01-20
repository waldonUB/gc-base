const fs = require('fs-extra')
const path = require('path')
console.log(`__dirname`, __dirname)
let filePath = path.resolve(__dirname, '../../models/mock/testJson.json')
console.info(`path`, filePath)
fs.readFile(filePath, (err, res) => {
	console.log(`res`, res.toString('utf-8'))
	console.log(`err`, err)
})
