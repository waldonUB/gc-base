const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr
  }
  const cur = arr.shift()
  const leftArr = arr.filter((item) => item < cur)
  const rightArr = arr.filter((item) => item >= cur)

  return [...quickSort(leftArr), cur, ...quickSort(rightArr)]
}

const arr = [5, 5, 5, 5, 518, 9, 5, 6, 7, 5, 5, 5, 5]

console.log(quickSort(arr))
