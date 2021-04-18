// function parseScene(scene) {
//     let obj = {}
//     let paramList = scene.split(':')
//     for (let item of paramList) {
//         let key = item.substring(0, 1)
//         obj[key] = item.substring(1, item.length)
//     }
//     return obj;
// }
//
// let scene = 's111:w111:q6666'
//
// console.log(`parseScene`, parseScene(scene))
//
//
// console.log(scene.substring(1, scene.length))

// 分号测试
// (function () {
//     console.log(`111`)
// }());
// (function () {
//     console.log(`222`)
// }())

// 分号测试

// var a = function () {
//     console.log(`a`)
// }
// [1, 2].forEach(item => item)

// function a () {
//   return new Promise(resolve => {
//     console.log(`a in`)
//     resolve(1)
//   })
// }
// function b () {
//   console.log(`a start`)
//   a().then(res => {
//     console.log(res)
//   })
//   console.log(`a end`)
// }
// b()

let a = [1, 2, 3]
let b = [1, 3]
console.log(a.includes(b))