// 取闭包中的promise返回值
function promise() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve('promise init')
    }, 1000)
  })
}
let fn = (function () {
  let init
  return function () {
    if (!init) {
      promise().then((res) => {
        init = res
        return init
      })
    } else {
      return init
    }
  }
})()

console.log(fn())
setTimeout(function () {
  console.log(fn())
}, 2000)
