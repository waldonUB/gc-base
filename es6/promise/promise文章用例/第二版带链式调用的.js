/**
 * 带链式调用版本的实现
 * 在第一版的基础上修改
 * @author waldon
 * @date 2021-09-30
 */
// let _onResolve = null // 因为有多个函数执行所以这个注释掉
const callbacks = [] // 存储.then的多个函数
class MyPromise {
  // 在new的时候会执行构造函数的逻辑
  constructor(executor) {
    const handle = (params) => {
      let _params = params // 这里如果是对象，应该深拷贝，避免影响入参
      // 遍历执行.then中的函数
      for (const onResolve of callbacks) {
        // 第二次.then中的入参就是上次return的值，所以这里的params直接等于.then函数的执行结果
        _params = onResolve && onResolve(_params)
      }
    }
    const resolve = (params) => {
      handle(params)
    }
    const reject = (params) => {}
    executor(resolve, reject)
  }
  // 每次执行.then的时候相当于把函数放进数组中，延迟到resolve的时候执行
  then(onResolve, onReject) {
    callbacks.push(onResolve)
    return this
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

myPromise
  .then((res) => {
    console.log(`第一次执行then`, res) // 2.输出2
    return 3
  })
  .then((subRes) => {
    console.log(`第二次执行then`, subRes) // 3.输出3
  })
