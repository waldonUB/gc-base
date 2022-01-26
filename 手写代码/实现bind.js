// waldon 其实就是实现一个硬绑定的函数，出自《你不知道的JavaScript》
Function.prototype.myBind = function (source) {
  const that = this // 这里用来存储之前调用bind的那个实例的指向
  console.log(`第一层的参数`, arguments)
  return function () {
    console.log(`第二层的参数`, arguments) // 如果是箭头函数，就和第一层的相同
    that.apply(source, arguments)
  }
}

const obj = {
  a: 2,
}

const foo = function () {
  console.log(this.a)
}
const bindFn = foo.myBind(obj)
bindFn()

/**
 * 第二版的感觉更简洁和全面
 * @author waldon
 * @date 2022-01-25
 */
// Function.prototype.myBind = function (_this, ...args) {
//   if (_this === null || _this === undefined) {
//     _this = window
//   }
//   _this.fn = this
//   return function (...args2) {
//     _this.fn(...args, ...args2)
//   }
// }

// window.z = 999
// const foo = function (x, y) {
//   console.log('this', this)
//   console.log('this.z + x + y : ', this.z + x + y)
// }

// const obj = {
//   z: 10,
// }

// const bar = foo.myBind('', 100)
// // const bar = foo.bind(1, 100)

// bar(1, 2)
