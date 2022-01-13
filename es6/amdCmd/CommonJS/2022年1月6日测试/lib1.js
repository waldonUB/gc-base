const { bar } = require('./lib2.js')

exports.foo1 = 1
exports.foo = function () {
  console.log('执行foo')
  bar()
}
exports.foo2 = function () {
  console.log('执行foo2')
}

console.log('这里是lib1')
