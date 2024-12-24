define(function (require, exports, module) {
  // 正确写法
  module.exports = {
    foo: 'bar',
    doSomething: function () {
      console.log(`doSomething`)
      // 随便加点注释提交
    },
  }
})
