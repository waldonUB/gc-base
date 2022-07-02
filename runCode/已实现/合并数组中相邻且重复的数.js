const merge = function (arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (res[res.length - 1] === undefined || res[res.length - 1] !== arr[i]) {
      res.push(arr[i])
    }
  }
  return res
}

/**
 * 快慢指针
 * @author waldon
 * @date 2022-03-31
 * @param {*} arr - param
 */
const merge2 = function (arr) {
  let slow = 0
  let fast = 0
  while (fast < arr.length) {
    if (arr[slow] !== arr[fast]) {
      arr[++slow] = arr[fast]
    }
    fast++
  }
  return arr.slice(0, slow + 1)
}

console.log(merge([3, 2, 2, 4, 5, 5, 6, 2, 1])) //  输出[3,2,4,5,6,2,1]
console.log(merge2([3, 2, 2, 4, 5, 5, 6, 2, 1])) //  输出[3,2,4,5,6,2,1]
// merge([3, 2, 3]) //  输出[3,2,3]
// merge([2, 2, 3]) //  输出[2,3]
