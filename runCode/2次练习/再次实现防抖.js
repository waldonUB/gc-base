const debounce = (function (fn, delay) {
  let timer = 0
  if (timer) {
    return
  }
  timer = setTimeout(() => {
    fn()
    timer = 0
  }, delay)
})()
