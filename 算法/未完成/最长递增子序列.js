/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // todo waldon 没完成，看题解
  const map = new Map()
  let maxLength = 0
  for (const item of nums) {
    if (!map.size()) {
      map.set(item, [item])
    } else {
      const isMin = [...map.keys()].every((key) => key < item)
      if (isMin) {
        map.set(item, [item])
      }
    }
  }
  for (const [key, value] of map) {
    curCom = [...value]
    for (const num of nums) {
      if (value[0] < num) {
      }
    }
  }
  return maxLength
}
// @lc code=end

const map = new Map()
map.set(1, '4')

for (const [item] of map) {
  console.log('item: ', item)
}

console.log([...map.keys()])
