
function MyPromise(executor) {
    var state = 'pending'
    var callbacks = []
    var currentVal = null
    if (typeof executor !== 'function') {
        throw new Error("executor is not a function")
    }
    this.then = function(onFulfilled, onRejected) {
        callbacks.push({onFulfilled, onRejected})
    }
    function resolve(data) {
        state = 'fulfilled'
        currentVal = data
        for (let i = 0; i < callbacks.length; i++) {
            currentVal = callbacks[i].onFulfilled(currentVal)
        }
    }
    function reject(data) {
        state = 'rejected'
        currentVal = data
    }
    executor(resolve, reject)
}

var promise = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1)
    }, 0)
})
promise.then(function (res) {
    console.log(res)
}, function (res) {
    console.log(res)
})
