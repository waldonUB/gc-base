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

console.log(quickSort(arr))
