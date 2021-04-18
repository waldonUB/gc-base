'use strict'
// let user = {name : 'wdq', age: 12}
// const INFO = user;
// user.name = 'ak'
// // INFO = null
// INFO.name = 'w'
// console.log(INFO)
//
// let [a, ...c] = [1, 2, 3]
// console.log(c)

// let obj = {
// //     a: 1,
// //     b: 2,
// //     c: 3
// // }
// //
// // let {a: A, b, C} = obj
// //
// // console.log(A)
// // console.log(b)
// var title = 1
//
// let template = `
// <div>
//     <span>${title}</span>
// </div>
// `
// console.log(template)

// let a = Symbol()
// // let b = Symbol
// // console.log(b)

// let arr = [1, 2]
// arr.push(3)
// // arr.add(4)
// console.log(arr)
//
// let set = new Set([1, 2])
// set.add(3)
// const a = '0'
// if (a) {
//     console.log(typeof true)
// }
// let count = 0
// const timer = setInterval(() => {
//     count ++
//     if (count === 10) {
//         clearInterval(timer)
//         return
//     }
//     console.log(count)
// },1000)
// console.log(`timer` + timer)

// const obj = {
//     1: 1
// }
//
// console.log(obj.hasOwnProperty())

// let person = {
//     first_name: 'waldon',
//     last_name: 'UB',
//     getFullName: ()=> {
//         // const _this = this
//         return this.first_name + this.last_name
//     }
// }
// // let fullName = person.getFullName()
// console.log(person.getFullName())

// var person = {
// //     first_name: 'waldon',
// //     last_name: 'UB',
// //     getFullName: function () {
// //         var _this = this
// //         return _this.first_name + _this.last_name
// //     }
// // }
// // var fullName = person.getFullName
// // // console.log(person.getFullName())
// // console.log(fullName())
// let a = 1;
// let promise2 = (function () {
//     return new Promise((resolve, reject) => {
//         if (a) {
//             resolve(a, a)
//         } else {
//             reject(a)
//         }
//     })
// })().then((onFulfilled, onRejected) => {
//     console.log(onFulfilled)
// }).catch(onRejected => {
//     console.log(onRejected)
// })
let src = 'http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg'
function loadImg(src) {
  return new Promise((resolve, reject) => {
    var img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(`图片加载失败`)
    }
    img.src = src
  })
}

var promise = loadImg(src)
promise
  .then(function (result) {
    console.log(result)
    return result
  })
  .catch(function (e) {
    console.log(e)
  })
  .then(null, function () {})
