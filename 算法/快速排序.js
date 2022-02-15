/**
 * 快速排序
 * @author waldon
 * @date 2022-02-15
 * @param {*} arr - param
 */
const quickSort = function (arr) {
  const splitNum = arr[0]
  const leftArr = arr.filter((item) => item < splitNum)
  const rightArr = arr.filter((item) => item > splitNum)

  const _leftPart = leftArr.length ? quickSort(leftArr) : leftArr
  const _rightPart = rightArr.length ? quickSort(rightArr) : rightArr

  return [..._leftPart, splitNum, ..._rightPart]
}

const arr = [2, 5, 8, 1, 4, 6, 89, 45, 12, 66, 44, 22, 33, 71]
console.log(quickSort(arr))
