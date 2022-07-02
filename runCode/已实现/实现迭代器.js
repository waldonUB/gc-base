const createIterator = function (target) {
  const obj = {
    index: -1,
    next() {
      const keys = Object.keys(target)
      this.index++
      return {
        value: target[keys[this.index]],
        done: this.index > keys.length - 1,
      }
    },
  }
  return obj
}

const a = createIterator({
  a: 1,
  b: 2,
})
console.log(a.next())
console.log(a.next())
console.log(a.next())
