// todo waldon 结果不对
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
const getArr = function (arr) {
  let initArr = []

  const getSubArr = function (subArr) {
    for (const item of subArr) {
      if (Array.isArray(item)) {
        getSubArr(item)
      } else {
        initArr.push(item)
      }
    }
  }
  getSubArr(arr)
  return [...new Set(initArr)].sort((x, y) => {
    return x - y
  })
}

console.log(getArr(arr))
