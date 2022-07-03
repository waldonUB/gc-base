const arr = [5, 5, 5, 5, 518, 9, 5, 6, 7, 5, 5, 5, 5]

const maoSort = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        let changeVal = arr[i]
        arr[i] = arr[j]
        arr[j] = changeVal
      }
    }
  }
  return arr
}

console.log(maoSort(arr))
