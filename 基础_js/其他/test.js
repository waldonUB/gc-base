// function myCurry(fn) {
//   const lastArgs = [...arguments].slice(1)
//   console.log('lastArgs: ', lastArgs)
//   return function () {
//     const curArgs = [...arguments]
//     console.log('curArgs: ', curArgs)
//     const allArgs = [...lastArgs, ...curArgs]
//     console.log('allArgs: ', allArgs)
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
