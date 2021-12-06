// waldon: Object.create的本质以目标对象为原型生成一个新的对象，相当于返回值的原型就是目标对象，也就是返回值的__proto__指向目标对象
const MyCreate = function (target, props) {
  const Fn = function () {}
  Fn.prototype = target
  if (props) {
    Object.defineProperties(Fn.prototype, props)
  }
  return new Fn() // 会用到new
}

// 测试用例
const obj = {
  a: 1,
}
const child = MyCreate(obj, {
  b: {
    value: 3,
  },
})
console.log(child)
child.a = 2
console.log(child.a)
console.log(child.b)
