let { a, b } = require('./a')
let { showVal } = require('./b')

a = 7

b = {}

b.child = 10
b.unD = 20

console.log(a)
showVal()
