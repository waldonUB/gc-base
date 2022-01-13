const { foo, foo1, foo2 } = require('./lib1.js')
exports.bar = function () {
  console.log('执行bar')
  console.log({ foo1 })
}
