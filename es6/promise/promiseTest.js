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

function Promise (fn) {
    var state = 'pending',
        value = null,
        callbacks = [];
    this.then = function (onFulfilled) { // promise.then()，里面的onFulfilled还是function
        if (state === 'pending') {
            callbacks.push(onFulfilled);
            // return this
        }
    }
    function resolve (newValue) {
        value = newValue
        state = 'fulfilled'
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(newValue)
            })
        }, 0)
    }
    fn(resolve)
}
// setTimeout(function () {
//     console.log(2)
// }, 0)
// setTimeout(function () {
//     console.log(1)
// })

var myPromise = new Promise(function (resolve) {
    resolve('3s') // 如果resolve执行比较快的话，状态就会变成fulfilled；要想办法在resolve之前，把then的function全部添加
    // setTimeout(function () {
    //     console.log(`你看到我的时候已经过了三秒了`)
    //     resolve('3s')
    // }, 3000)
})

myPromise.then(function (result) {
    console.log(result)
    // return '4s'
})
console.log(`开始`)

// promise内是一个参数的function，这个function有两个参数，分别是resolve和reject，这两个也是function
// 当new Promise的时候，会定义promise内的变量，然后开始异步执行setTimeout内的方法（）
// 当每次调用then的时候，都会把then后面的function传进callbacks数组内
// 当setTimeout内的方法执行到resolve的时候，会把所有callbacks内的function都执行一遍