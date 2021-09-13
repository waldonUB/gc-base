// todo waldon 未完成
class MyPromise {
  static #callbacks = []
  constructor(executor) {
    let state = 'pending'
    const handle = (params) => {
      setTimeout(() => {
        for (const item of MyPromise.#callbacks) {
          switch (state) {
            case 'fulfilled':
              item.onResolve(params)
              break
            case 'failed':
              item.onReject(params)
              break
          }
        }
      }, 0)
    }
    const resolve = (params) => {
      state = 'fulfilled'
      handle(params)
    }
    const reject = (params) => {
      state = 'failed'
      handle(params)
    }
    executor(resolve, reject)
  }

  then(onResolve, onReject) {
    MyPromise.#callbacks.push({
      onResolve,
      onReject,
    })
    return this
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(`1`)
    resolve(2)
  }, 500)
})
myPromise.then((res) => {
  console.log(`resolve ${res}`)
})
