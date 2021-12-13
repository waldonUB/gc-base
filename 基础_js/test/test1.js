// const myCreate = function (target) {
//   const Fn = function () {}
//   Fn.prototype = target
//   return new Fn()
// }

const myNew = function (fn, ...args) {
  const resObj = Object.create(fn.prototype)
  const _instance = fn.apply(resObj, args)
  if (typeof _instance === 'object' || typeof _instance === 'function') {
    return _instance
  }
  return resObj
}
const Foo = function (a, b) {
  return {
    a,
    b,
  }
}
const foo1 = myNew(Foo, 2, 5)
console.log(foo1)

console.log(`fff`, Function.prototype.__proto__ === Object.prototype)
