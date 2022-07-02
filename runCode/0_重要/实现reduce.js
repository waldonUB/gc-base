/**
 * 自己手写的实现，不带校验
 * @author waldon
 * @date 2022-02-22
 * @param {*} execute - param
 * @param {*} initParam - param
 */
Array.prototype.myReduce = function (execute, initParam) {
  let pre = initParam
  let cur = ''
  const _length = this.length
  for (let i = 0; i < _length; i++) {
    cur = this[i]
    pre = execute(pre, cur)
  }
  return pre
}

const arr = [1, 2, 3, '4', 5]
const arr2 = arr.myReduce((pre, cur) => {
  if (typeof cur === 'number') {
    pre.push(cur)
  }
  return pre
}, [])
console.log(arr2)

const arr3 = arr.reduce((pre, cur) => {
  if (typeof cur === 'number') {
    pre.push(cur)
  }
  return pre
}, [])
console.log(arr3)
