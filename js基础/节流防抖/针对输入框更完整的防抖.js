/**
 * 防抖
 * @modify waldon 2021年4月28日 新增immediate和cacheKey
 * 针对input的输入加了缓存的key值，滚动要用的话传scrollTop的值
 * 其他防抖，比如按钮点击用不到的话可以忽略
 */
const debounce = (function () {
  let timer = 0
  let cacheKey = ''
  return function (fn, wait = 200, immediate = false, key = '') {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let callNow = !timer
      if (callNow) {
        cacheKey = key
        fn()
      }
    }
    timer = setTimeout(() => {
      if (!immediate || cacheKey !== key) {
        fn()
      }
      timer = 0
    }, wait)
  }
})()
