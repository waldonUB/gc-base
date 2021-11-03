;(function () {
  var a = (b = 3)
  // 相当于 b = 3
  // var a = b，因为是从右向左执行的
})()

console.log('a defined? ' + (typeof a !== 'undefined'))
console.log('b defined? ' + (typeof b !== 'undefined'))
// true
// true
