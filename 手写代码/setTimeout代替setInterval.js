function mySetInterval(fn, timeout) {
  setTimeout(() => {
    mySetInterval(fn, timeout)
    fn()
  }, timeout)
}

const foo = function () {
  console.log(`show name`)
}
mySetInterval(foo, 3000)
