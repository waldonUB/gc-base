let i = 0
let arr = new Array(10000).fill(i++)
let newArr = []
console.time()
newArr = newArr.concat(arr)
console.timeEnd()

let newArr1 = []

console.time()
for (const item of arr) {
  newArr.push(item)
}
console.timeEnd()
