const arr = [2, 2, 5, 6, 7, 8, 1, 5]

const getUquNum = function (arr) {
  const map = new Map()
  const res = []
  for (const item of arr) {
    if (!map.has(item)) {
      res.push(item)
      map.set(item, 1)
    }
  }
  return res
}

/**
 * 双指针去重，快慢指针
 * @author waldon
 * @date 2022-03-28
 * @param {*} param - param
 */
const getUquNum2 = function (arr) {
  const _arr = arr.sort()
  let slow = 0
  let fast = 0

  while (fast < _arr.length) {
    if (arr[fast] !== arr[slow]) {
      slow++
      arr[slow] = arr[fast]
    }
    fast++
  }

  return slow + 1
}

console.log([...new Set(arr)])

console.log(getUquNum(arr))
console.log(getUquNum2(arr))
