// let arr = [1, 2, 3]
// let newArr = []
// const start = new Date().getTime()
// for (let i = 0; i < 100000; i++) { // 79321
//     newArr = newArr.concat(arr)
// }
// const end = new Date().getTime()
// console.log(`输出花费时间：` + (end - start))
// console.log(newArr)


let arr = [1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3]
let newArr = []
const start = new Date().getTime()
for (let i = 0; i < 100000; i++) { // 9
    Array.prototype.push.apply(newArr, arr)
}
const end = new Date().getTime()
console.log(`输出花费时间：` + (end - start))
console.log(newArr)
