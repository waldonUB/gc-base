const callbacks = [] // 这里用来存储.then的链式调用中所有函数
class MyPromise {
  constructor(executor) {
    let state = 'pending'
    const handle = (params) => {
      let _params = params // 这里如果是对象，应该深拷贝，避免影响入参
      // 加异步是因为即使放在resolve()后面的同步代码，也会在resolve()之前执行
      setTimeout(() => {
        for (const item of callbacks) {
          switch (state) {
            case 'fulfilled':
              // 第二次.then中的入参就是上次return的值，所以这里的params直接等于.then函数的执行结果
              _params = item.onResolve && item.onResolve(_params)
              break
            case 'failed':
              _params = item.onReject && item.onReject(_params)
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

// 测试用例
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const a = 0
    if (a > 0) {
      console.log(`执行Promise中异步的逻辑`, 1)
      resolve(2)
    } else {
      reject('异常信息处理')
    }
  }, 500)
})

myPromise
  .then(
    (res) => {
      console.log(`第一次执行then`, res)
      return 3
    },
    (err) => {
      console.log(`第一次执行reject`, err)
      return 30
    }
  )
  .then(
    (subRes) => {
      console.log(`第二次执行then`, subRes)
    },
    (subErr) => {
      console.log(`第二次执行reject`, subErr)
    }
  )
