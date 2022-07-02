// 基本的模块模式
var module = (function () {
  var foo = function () {
    console.log(`foo`)
  }
  var bar = function () {
    console.log(`bar`)
  }
  return { foo, bar }
})()

// 可扩展的模块模式
var moduleExpand = (function (module) {
  module.foo1 = function () {
    console.log(`foo1`)
  }
  module.bar2 = function () {
    console.log(`bar2`)
  }
  return module
})(module)
moduleExpand.foo()
moduleExpand.foo1()

console.log(Math.abs(~2016))
