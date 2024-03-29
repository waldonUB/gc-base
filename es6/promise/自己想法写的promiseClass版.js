// todo waldon 未完成
const callbacks = [] // 这里用来存储.then的链式调用中所有函数
class MyPromise {
  constructor(executor) {
    let state = 'pending'
    const handle = (params) => {
      let _params = params // 这里如果是对象，应该深拷贝，避免影响入参
      setTimeout(() => {
        for (const item of callbacks) {
          switch (state) {
            case 'fulfilled':
              _params = item.onResolve(_params)
              break
            case 'failed':
              _params = item.onReject(_params)
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
    callbacks.push({
      onResolve,
      onReject
    })
    return this
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const a = 1
    if (a > 0) {
      console.log(`执行Promise中异步的逻辑`, 1)
      resolve(2)
    } else {
      reject('异常信息处理')
    }
  }, 500)
})

// 测试用例
myPromise
  .then((res) => {
    console.log(`第一次执行then`, res)
    return 3
  })
  .then((subRes) => {
    console.log(`第二次执行then`, subRes)
  })
