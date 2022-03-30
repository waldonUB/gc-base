const myInstanceOf = function (instance, constructor) {
  while (instance) {
    if (Object.getPrototypeOf(instance) === constructor.prototype) {
      return true
    }
    instance = Object.getPrototypeOf(instance)
  }
  return false
}

const Fn = function () {}

const fn = new Fn()

console.log(myInstanceOf(fn, Fn))
console.log(fn instanceof Fn)
