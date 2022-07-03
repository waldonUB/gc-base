const arr = [1, 2, 3, 4, 5]

/**
 * 实现一个乱序输出的数组
 * @author waldon
 * @date 2021-10-24
 * @param {Array} arr - param
 */
function getArr(arr) {
  let resArr = []
  if (!(Array.isArray(arr) && arr.length)) {
    return
  }
  const _arr = [...arr]
  for (const item of arr) {
    const randomIndex = Math.random() * _arr.length
    console.log(randomIndex)
    const curArr = _arr.splice(randomIndex, 1)
    resArr = [...resArr, ...curArr]
  }
  return resArr
}
console.log(getArr(arr))
