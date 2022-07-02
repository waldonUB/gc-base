const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  const cur = arr.shift() // 精髓在于弹出要比较的数
  const leftArr = arr.filter((item) => item < cur)
  const rightArr = arr.filter((item) => item >= cur)

  return [...quickSort(leftArr), cur, ...quickSort(rightArr)]
}

const arr = [5, 5, 5, 5, 518, 9, 5, 6, 7, 5, 5, 5, 5]

/**
 * 复习一下
 * @author waldon
 * @date 2022-04-25
 * @param {*} arr - param
 */
function quickSort2(arr) {
  if (!arr.length) {
    return arr
  }
  const cur = arr.shift()
  const leftArr = arr.filter((item) => item <= cur)
  const rightArr = arr.filter((item) => item > cur)
  return [...quickSort2(leftArr), cur, ...quickSort2(rightArr)]
}

console.log(quickSort2(arr))
