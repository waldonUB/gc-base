const arr = [5, 1, 3, 2, 6, 8, 7]

/**
 * 第二次复习
 * 这个方式相当于拿出来插到另一副牌
 * @author waldon
 * @date 2022-05-10
 * @param {*} arr - param
 */
function insertSort(arr) {
  const res = [arr[0]]
  for (let i = 1, len = arr.length; i < len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[i] > res[j]) {
        res.splice(j + 1, 0, arr[i])
        break
      } else if (j === 0) {
        res.splice(0, 0, arr[i])
      }
    }
  }
  return res
}

console.log(insertSort(arr))

/**
 * 就像打牌一样
 * 我从第二张牌开始跟左边的牌比较，如果比他大，就插在他前面，否则就在后面
 * 到第三张牌的时候，左边的两张牌默认已经排好序了，只需按照刚刚的方法，找到第一张比他大的牌插进去就可以了
 * 以此类推
 * @author waldon
 * @date 2022-04-25
 * @param {*} arr - param
 */
function insertSort2(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) {
    return arr
  }
  const _arr = [...arr]
  for (let i = 1, len = _arr.length - 1; i < len; i++) {
    let temp = _arr.splice(i, 1)[0]
    for (let j = i - 1; j >= 0; j--) {
      if (temp > _arr[j]) {
        _arr.splice(j + 1, 0, temp)
        break
      } else if (j === 0) {
        _arr.splice(0, 0, temp)
      }
    }
  }
  return _arr
}

// console.log(`insertSort`, insertSort2(arr))
