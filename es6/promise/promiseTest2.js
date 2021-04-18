// 按照自己的想法写的,resolve和reject的function要优化?
function MyPromise(executor) {
  var state = 'pending'
  var callbacks = []
  if (typeof executor !== 'function') {
    throw new Error('executor is not a function')
  }
  this.then = function (onFulfilled, onRejected) {
    callbacks.push({ onFulfilled, onRejected })
    return this
  }
  function resolve(data) {
    state = 'fulfilled'
    handle(data, state)
  }
  function reject(data) {
    state = 'rejected'
    handle(data, state)
  }
  function handle(data, state) {
    if (state === 'pending') {
      return
    }
    setTimeout(function () {
      for (let i = 0; i < callbacks.length; i++) {
        if (state === 'fulfilled') {
          data = callbacks[i].onFulfilled(data)
        } else if (state === 'rejected') {
          data = callbacks[i].onRejected(data)
        } else {
          throw new Error('state is not sure')
        }
      }
    }, 0)
    ;(function (data, state) {})(data, state)
  }
  executor(resolve, reject)
}

var promise = new MyPromise(function (resolve, reject) {
  setTimeout(function () {
    reject(1)
  }, 0)
})
promise
  .then(
    function (res) {
      console.log(res)
      return 5
    },
    function (res) {
      console.log(`rejected:` + res)
      return 6
    }
  )
  .then(
    function (res) {
      console.log(res)
    },
    function (res) {
      console.log(`rejected:` + res)
    }
  )

MyPromise.all = function (...promise) {}
