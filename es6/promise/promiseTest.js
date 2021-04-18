// var promise = new Promise((resolve, reject) => {
//     var a = 1;
//     if (!a) {
//         resolve(1)
//     } else {
//         reject(2)
//     }
// })
// var promise = new Promise(function (resolve, reject) {
//     var a = 1;
//     if (a) {
//         resolve(1)
//     } else {
//         reject(2)
//     }
// })
// promise.then(function (a) {
//     console.log(a)
//     return 2
// }, function (b) {
//     console.log(b)
// }).then(function (a) {
//     console.log(a)
// })

// promise.then(a => {}, b => {})

// function Promise (fn) {
//     var state = 'pending',
//         value = null,
//         callbacks = [];
//     this.then = function (onFulfilled) { // promise.then()，里面的onFulfilled还是function
//         if (state === 'pending') {
//             callbacks.push(onFulfilled);
//             return this // 返回promise对象，可以链式调用
//         }
//         onFulfilled(value)
//         return this
//     }
//     function resolve (newValue) {
//         value = newValue
//         state = 'fulfilled'
//         setTimeout(function () {
//             callbacks.forEach(function (callback) {
//                 var callbackResult = callback(newValue)
//                 if (typeof callbackResult !== 'undefined') { // 新增：可以解决then返回值不生效的问题
//                     newValue = callbackResult
//                 }
//             })
//         }, 0)
//     }
//     fn(resolve)
// }
// // setTimeout(function () {
// //     console.log(2)
// // }, 0)
// // setTimeout(function () {
// //     console.log(1)
// // })
//
// var myPromise = new Promise(function (resolve) {
//     // resolve('3s') // 如果resolve执行比较快的话，状态就会变成fulfilled；要想办法在resolve之前，把then的function全部添加
//     setTimeout(function () {
//         console.log(`你看到我的时候已经过了三秒了`)
//         resolve('3s')
//     }, 3000)
// })
//
// myPromise.then(function (result) {
//     console.log(`第一次then：` + result)
//     return '4s' // return的值没有传进第二个then？
// }).then(function (result) {
//     console.log(`第二次then：` + result)
//     return new Promise(function (resolve) {
//         resolve('5s')
//     })
// }).then(function (result) {
//     console.log(`第三次then：` + result)
// })
// console.log(`开始`)

// function chainFunction() {
//     return new Promise(function (resolve) {
//         resolve('5s')
//     })
// }

// promise内是一个参数的function，这个function有两个参数，分别是resolve和reject，这两个也是function
// 当调用Promise的时候，会判断this指向的是不是一个对象，如果不是以new的方式创建的this会指向window；再判断传进来的executor参数是不是function，
// 如果不符合直接抛出类型错误的异常。然后开始定义当前状态为'pending'（初始化），并定义一个用来存储then函数内onFulfilled的数组。因为可能会存在链式调
// 用，需要存储多个then函数，所以每调用一次then的时候，就把onFulfilled的function传进callbacks数组内，并返回一个promise对象。
// 这时候executor的function是异步执行的，执行完之后就会调用resolve函数，这里需要注意的是可能出现的情况是resolve执行在then函数之前，
// 这样实际上是执行不了then函数的，所以把resolve执行callback的函数放在setTimeout里面，通过这种方式来把他放到js执行队列的最后。然后再resolve函数内
// 判断callback的返回值是否是object或promise，再把返回值传递给下一个callback
// 会定义promise内的变量，然后开始异步执行setTimeout内的方法（）
// 当每次调用then的时候，都会把then后面的function传进callbacks数组内
// 当setTimeout内的方法执行到resolve的时候，会把所有callbacks内的function都执行一遍
