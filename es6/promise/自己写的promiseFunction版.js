// todo waldon 未完成
function MyPromise(executor) {
  let _resolveRes = ''
  const thenArr = []
  // state只是用来判断是resolve还是reject，执行对应的方法
  let state = 'padding'
  const resolve = function (resolveRes) {
    if (state === 'padding') {
      state = 'full'
    }
    _resolveRes = resolveRes
    for (let item of thenArr) {
      _resolveRes = item(_resolveRes)
    }
  }

  const reject = function (rejectRes) {
    if (state === 'padding') {
      state = 'fail'
    }
  }

  executor(resolve, reject)

  const then = function (thenFunc) {
    thenArr.push(thenFunc)
    return this
  }
  // 这里只实现最基本的功能，catch其实是个语法糖，就不在这里贴出了
  return {
    then
  }
}

const promise = new MyPromise((resolve, reject) => {
  console.log(`1`)
  setTimeout(() => {
    console.log(`setTimeout`)
    resolve(2)
  }, 1000)
})
promise
  .then((res) => {
    console.log(`then ${res}`)
    return 3
  })
  .then((subRes) => {
    console.log(`then subRes ${subRes}`)
  })
