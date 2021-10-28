// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures MDN的闭包解释

// wladon satrt
// 闭包就是在一个函数创建的时候，由这个函数和它所能访问到作用域（词法环境）组成。
// 这些词法环境包括声明的变量或函数
// 使用场景：防抖，创建私有变量或私有方法，函数的柯里化（后面找例子确认）

// 私有方法作用
// 架构上传api的时候，每次都要先获取accessKey，这个其实是业务页面用不到的，
// 那这种情况其实就可以放在一个闭包中，仅仅由return对象的上传、校验等function去调用他就行

// 还有访客的行为上报
// 上报前是需要初始化一个recorTicket的，这个也不需要业务页面去主动调

// 猜想
// 只要有函数创建，就会有闭包产生。在script标签下直接创建的函数，这个闭包就是由这个函数和全局作用域组成的

// wladon end

// 经典闭包
// const closureFn = (() => {
//   let time = 0;
//   return () => {
//     console.log(`current time`, ++time);
//   };
// })();
// closureFn();
// closureFn();
// closureFn(); // 结果是3，是拿了同一个变量

// 循环中指向异步函数
// for (var i = 0; i < 5; i++) {
//   ;((j) => {
//     var k = i
//     setTimeout(() => {
//       console.log(`j:`, j)
//       console.log(`k:`, k)
//     }, 1000)
//   })(i)
// }

// 循环闭包测试
var obj = {}
function testClosure(i) {
  return function () {
    console.log(`testClosure`, i)
  }
}
for (var i = 0; i < 5; i++) {
  obj = {
    fn: testClosure(i)
  }
  Promise.resolve().then(() => {
    console.log(`promise`, i) // 5次5
  })
}
obj.fn() // 4
