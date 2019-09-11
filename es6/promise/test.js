var promise = new Promise(function (resolve, reject) {
    reject(1)
})

promise.then(function () {

}, function (result) {
    console.log('reject:' + result)
    return 2
}).then(function (result) {
    console.log('resolve:' + result)
}, function (result) {
    console.log('reject:' + result)
})
