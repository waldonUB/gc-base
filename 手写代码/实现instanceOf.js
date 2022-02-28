/**
 * 主要是看他在不在构造函数的原型链上
 * @author waldon
 * @date 2022-02-24
 */
const myInstanceof = function (instance, constructor) {
  if (typeof constructor !== 'function') {
    throw Error('not an object')
  }
  let flag = false
  while (instance && !flag) {
    if (instance['__proto__'] === constructor.prototype) {
      return true
    }
    instance = instance['__proto__']
  }
  return flag
}

const Fn = function () {}
const Child = function () {}
Child.prototype = new Fn()

const foo = new Fn()
const child = new Child()
console.log(foo instanceof Fn)
console.log(child instanceof Fn)
console.log(child.__proto__.__proto__ === Fn.prototype)

console.log('myInstanceof: ', myInstanceof(foo, Fn))
console.log('myInstanceof: ', myInstanceof(child, Fn))
