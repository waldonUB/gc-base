Array.prototype.myReduce = function (callback, initVal) {
  if (!Array.isArray(this)) {
    throw new Error('xxx')
  }
  for (const item of this) {
    initVal = callback(initVal, item)
  }
  return initVal
}

const arr = [1, 2, 3]
console.log(
  arr.myReduce((pre, cur) => {
    return pre + cur
  }, 0),
)
