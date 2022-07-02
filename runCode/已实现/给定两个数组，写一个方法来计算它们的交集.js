// ### 第 59 题：给定两个数组，写一个方法来计算它们的交集。
// > 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
// 解析：[第 59 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/102)

function getCommonArr(arr1, arr2) {
  const res = []
  while (arr1.length) {
    const item = arr1.pop()
    if (arr2.includes(item)) {
      res.push(item)
    }
  }
  return res
}

function getCommonArr2(arr1, arr2) {
  const res = []
  const map = new Map()
  for (const item of arr1) {
    if (map.get(item)) {
      map.set(item, map.get(item) + 1)
    } else {
      map.set(item, 1)
    }
  }

  for (const item of arr2) {
    if (map.get(item)) {
      res.push(item)
      map.set(item, map.get(item) - 1)
    }
  }
  return res
}

/**
 * 排序 + 双指针
 * @author waldon
 * @date 2022-04-01
 * @param {*} arr1 - param
 * @param {*} arr2 - param
 */
function getCommonArr3(arr1, arr2) {
  arr1 = arr1.sort((a, b) => a - b)
  arr2 = arr2.sort((a, b) => a - b)

  const res = []
  let start1 = 0
  let start2 = 0
  while (start1 < arr1.length && start2 < arr2.length) {
    if (arr1[start1] === arr2[start2]) {
      res.push(arr1[start1])
      start1++
      start2++
    } else if (arr1[start1] < arr2[start2]) {
      start1++
    } else {
      start2++
    }
  }
  return res
}

console.log(getCommonArr3([1, 2, 2, 1], [2, 2]))
