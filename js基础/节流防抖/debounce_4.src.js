const debounce = (function () {
  let timer = 0
  let cacheKey = ''
  return function (fn, delay = 300, immediate = true, key = '') {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      // 立即执行
      let callNow = !timer
      timer = setTimeout(() => {
        timer = 0
        if (cacheKey !== key) {
          fn()
        }
      }, delay)
      if (callNow) {
        cacheKey = key
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
window.debounce = debounce
