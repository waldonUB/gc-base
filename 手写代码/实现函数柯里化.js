// https://github.com/mqyqingfeng/Blog/issues/42

/**
 * 函数柯里化
 * @author waldon
 * @date 2022-02-24
 * @param {*} param - param
 */
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

// 柯里化的演变
// function curry(f) { // curry(f) does the currying transform
//   return function(a) {
//     return function(b) {
//       return f(a, b);
//     };
//   };
// }
