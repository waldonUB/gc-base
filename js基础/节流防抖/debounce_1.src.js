const debounce = (function () {
  let timer = 0
  return function (fn, delay = 300) {
    if (timer) {
      clearTimeout(timer)
    }
    // 非立即执行
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
})()
window.debounce = debounce
