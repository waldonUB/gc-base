const debounce = (function () {
  let timer = 0
  return function (fn, wait = 200, immediate = true) {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = 0
      }, wait)
      if (callNow) {
        fn()
      }
    } else {
      timer = setTimeout(() => {
        fn()
        timer = 0
      }, wait)
    }
  }
})()
