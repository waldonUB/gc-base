Object.prototype.myCreate = function (source) {
  const obj = {}
  obj.__proto__ = source
  return obj
}
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

const nums = [-1, 0, 3, 5, 9, 12]
const target = 9

function getTarget(nums, target) {
  const index = Math.floor(nums.length / 2)
  const cur = nums[index]
  if (cur === target) {
    return index
  } else if (cur > target) {
    getTarget(nums.slice(index), target)
  } else {
    getTarget(nums.slice(0, index), target)
  }
}
console.log(getTarget(nums, target))
