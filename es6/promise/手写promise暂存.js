const MyPromise = function (excutor) {
  if (typeof excutor !== 'function') {
    throw new Error(`入参不是函数`)
  }
  let state = 'padding'
  const callbacks = []

  const runCallBacks = (params) => {
    setTimeout(() => {
      for (let item of callbacks) {
        switch (state) {
          case 'full':
            item.resolveFn(params)
            break
          case 'fail':
            item.rejectFn(params)
        }
      }
    }, 0)
  }
  const resolve = (params) => {
    state = 'full'
    runCallBacks(params)
  }
  const reject = (params) => {
    state = 'fail'
    runCallBacks(params)
  }

  this.then = (resolveFn, rejectFn) => {
    callbacks.push({
      resolveFn,
      rejectFn,
    })
    return this
  }
  excutor(resolve, reject)
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(1)
    // resolve(2)
    reject(2)
  }, 500)
})

promise.then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(`reject: ${err}`)
  },
)
