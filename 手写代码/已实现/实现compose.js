const composeObj = {
  add: (num) => num + 5,
  multipart: (num) => num * 5,
  div: (num) => num / 5,
}
const { add, multipart, div } = composeObj

function compose() {
  const fns = [...arguments]
  return function () {
    while (fns.length) {
      const fn = fns.pop()
      args = fn(...arguments)
    }
    return args
  }
}
console.log(compose(add, multipart, div)(10))
