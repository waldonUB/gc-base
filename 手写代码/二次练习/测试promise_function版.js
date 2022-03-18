const MyPromise = function (execute) {
  this.callbacks = []
  this.state = 'pending'
  const _this = this

  function handle(res) {
    setTimeout(() => {
      for (let i = 0; i < _this.callbacks.length; i++) {
        const { resolveFn, rejectFn } = _this.callbacks[i]
        switch (this.state) {
          case 'fulfilled':
            res = resolveFn && resolveFn(res)
            break
          case 'failed':
            res = rejectFn && rejectFn(res)
        }
      }
    }, 0)
  }

  function resolve(res) {
    this.state = 'fulfilled'
    handle(res)
  }

  function reject(res) {
    this.state = 'failed'
    handle(res)
  }

  execute(resolve, reject)
}

MyPromise.prototype.then = function (resolveFn, rejectFn) {
  this.callbacks.push({
    resolveFn,
    rejectFn,
  })
  return this
}

/**
 * 当callbacks存在err函数的时候，就不需要，如果不存在，就用这个去替换
 * @author waldon
 * @date 2022-03-17
 * @param {*} _rejectFn - param
 */
MyPromise.prototype.catch = function (_rejectFn) {
  if (this.callbacks.length) {
    const { rejectFn } = this.callbacks[this.callbacks.length - 1]
    if (!rejectFn) {
      this.callbacks[this.callbacks.length - 1].rejectFn = _rejectFn
    }
  } else {
    this.callbacks.push({
      rejectFn: _rejectFn,
    })
  }
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
    reject(2)
  }, 100)
  console.log(3)
})

myPromise
  .then((res) => {
    console.log('res', res)
  })
  .catch((res) => {
    console.log('第二次：', res)
  })

MyPromise.resolve(5).then((res) => {
  console.log('MyPromise.resolve', res)
})
