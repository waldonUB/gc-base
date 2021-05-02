/**
 * 防抖函数lastTimer版
 * @author waldon
 * @date 2021-05-01
 * @returns {Function} - 防抖函数
 */
const debounce = (function () {
  let timer = 0
  let lastTimer = 0
  return function (fn, delay = 300, immediate = true) {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      // 立即执行
      let callNow = !timer
      timer = setTimeout(() => {
        if (lastTimer !== timer) {
          timer = 0
          lastTimer = 0
          fn()
        }
      }, delay)
      if (callNow) {
        lastTimer = timer
        fn()
      }
    } else {
      // 非立即执行
      timer = setTimeout(() => {
        fn()
        timer = 0
      }, delay)
    }
  }
})()
window.debounce = debounce
