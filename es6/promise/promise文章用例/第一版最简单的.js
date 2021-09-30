let _onResolve = null // 这是第一次成功会执行的函数，也就是.then中的 res => {}
class MyPromise {
  // 在new的时候会执行构造函数的逻辑
  constructor(executor) {
    const resolve = (params) => {
      // 当Promise中调用resolve这个函数时，其实就相当于开始执行.then中的逻辑
      _onResolve(params)
    }
    const reject = (params) => {}
    // 这里执行的是传进来的(resolve, reject) => {}这个函数
    executor(resolve, reject)
  }
  then(onResolve, onReject) {
    _onResolve = onResolve
  }
}

// 测试用例
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    const a = 1
    if (a > 0) {
      console.log(`执行Promise中异步的逻辑`, 1) // 1.输出1
      resolve(2)
    } else {
      reject('异常信息处理')
    }
  }, 500)
})

myPromise.then((res) => {
  console.log(`第一次执行then`, res) // 2.输出2
  return 3
})
