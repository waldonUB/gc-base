Array.prototype.myMap = function (fn) {
  const arr = this
  const res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    res.push(fn(arr[i], i, arr))
  }
  return res
}

// const arr = [1, 2, 3]
// console.log(
//   arr.myMap((item) => {
//     return item + '_'
//   }),
// )
