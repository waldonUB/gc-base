// 实现reduce

Array.prototype.myReduce = function (execute, initVal) {
  if (!Array.isArray(this)) {
    // 校验提示
    throw new Error('不是数组')
  }
  const arr = this
  let pre
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i === 0) {
      pre = initVal
    }
    pre = execute(pre, arr[i])
  }
  return pre
}

const arr = [1, 2, 3]

console.log(
  arr.reduce((pre, cur) => {
    return pre + cur
  }, 0),
)
