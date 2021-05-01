const Debounce = (function () {
  let timer = 0
  return function (fn, delay = 300, immediate = true) {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        fn() // 比立即执行的版本多了这一步
        timer = 0
      }, delay)
      if (callNow) {
        fn()
      }
    } else {
      // 非立即执行
      timer = setTimeout(() => {
        fn()
      }, delay)
    }
  }
})()
window.Debounce = Debounce
