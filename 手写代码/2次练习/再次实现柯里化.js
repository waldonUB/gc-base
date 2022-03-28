const curry = function (fn) {
  const args = [...arguments].slice(1)
  return function () {
    const newArgs = [...args, ...arguments]
    if (newArgs.length < fn.length) {
      return curry.call(this, fn, ...newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}

const add = function (a, b) {
  return a + b
}

const add5 = curry(add, 5)

console.log(add5(4))
console.log(add5(5))
