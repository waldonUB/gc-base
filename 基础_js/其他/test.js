// function myCurry(fn, ...args) {
//   return function () {
//     const allArgs = [...args, ...arguments]
//     if (allArgs.length < fn.length) {
//       return myCurry(fn, ...allArgs)
//     } else {
//       return fn.apply(this, allArgs)
//     }
//   }
// }

// const add = function (a, b, c) {
//   return a + b + c
// }

// const curryAdd = myCurry(add)
// console.log(curryAdd(1))
// console.log(curryAdd(1))
// console.log(curryAdd(1))
// console.log(curryAdd(1))
// console.log(curryAdd(1))
