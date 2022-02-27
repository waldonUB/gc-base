const throttle = (function (fn, delay) {
  let startTime = new Date().getTime()
  return function () {
    let endTime = new Date().getTime()
    if (endTime - startTime > delay) {
      fn()
      startTime = endTime
    }
  }
})()
