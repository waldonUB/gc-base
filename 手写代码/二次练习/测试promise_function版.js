const MyPromise = function (execute) {
  this.callbacks = []
  const _this = this
  function resolve(res) {
    setTimeout(() => {
      for (let i = 0; i < _this.callbacks.length; i++) {
        const { resolveFn } = _this.callbacks[i]
        res = resolveFn(res)
      }
    }, 0)
  }

  function reject(res) {}

  execute(resolve, reject)
}

MyPromise.prototype.then = function (resolveFn, rejectFn) {
  this.callbacks.push({
    resolveFn,
    rejectFn,
  })
  return this
}

MyPromise.resolve = function (res) {
  return new MyPromise((resolve) => {
    resolve(res)
  })
}

const myPromise = new MyPromise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    resolve(2)
  }, 100)
  console.log(3)
})

myPromise.then((res) => {
  console.log('res', res)
})

MyPromise.resolve(5).then((res) => {
  console.log('MyPromise.resolve', res)
})
