// waldon: Object.create的本质以目标对象为原型生成一个新的对象，相当于返回值的原型就是目标对象，也就是返回值的__proto__指向目标对象
const MyCreate = function (target, props) {
  const Fn = function () {}
  Fn.prototype = target
  if (props) {
    Object.defineProperties(Fn.prototype, props)
  }
  return new Fn() // 会用到new
}

/**
 * 不用new的版本
 * @author waldon
 * @date 2022-02-15
 * @param {*} target - param
 * @param {*} props - param
 */
const MyCreateWithoutNew = function (target, props) {
  const obj = {}
  obj.__proto__ = target
  if (typeof props === 'object' && props !== null) {
    Object.defineProperties(obj, props)
  }
  return obj
}

// 测试用例
const obj = {
  a: 1,
}
const child = MyCreateWithoutNew(obj, {
  b: {
    value: 3,
  },
})
console.log(child)
child.a = 2
console.log(child.a)
console.log(child.b)
