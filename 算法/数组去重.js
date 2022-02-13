const arr = [2, 1, 3, 1, 5, 8, 7, 5]

// console.log([...new Set(arr)].sort())

const getArr = function (arr) {
  const obj = {}
  const newArr = []
  for (const item of arr) {
    if (obj[item] === undefined) {
      newArr.push(item)
    }
    obj[item] = ''
  }
  return newArr
}
console.log(getArr(arr).sort())
