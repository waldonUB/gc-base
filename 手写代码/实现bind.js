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
  a: 2
}

const foo = function () {
  console.log(this.a)
}
const bindFn = foo.myBind(obj)
bindFn()
