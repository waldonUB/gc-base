const mySetInterval = function (fn, delay) {
  let timer
  function reloadFn() {
    timer = setTimeout(() => {
      fn()
      reloadFn()
    }, delay)
  }
  reloadFn()
  function clear() {
    clearTimeout(timer)
  }
  return {
    clear,
  }
}

const { clear } = mySetInterval(() => {
  console.log(111)
}, 500)

setTimeout(() => {
  clear()
}, 10000)
