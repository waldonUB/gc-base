const throttle = (function () {
  let startTime = 0
  return function (fn, delay) {
    const endTime = new Date().getTime()
    if (endTime - startTime > delay) {
      fn()
      startTime = endTime
    }
  }
})()
