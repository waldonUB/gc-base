let i = 0
let arr = new Array(100).fill(i++)

let newArr1 = []

console.time()
// for (const item of arr) {
//   newArr1.push(item)
// }
let newArr2 = arr.slice(0)
console.timeEnd()
