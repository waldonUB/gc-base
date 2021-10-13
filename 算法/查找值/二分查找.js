const nums = [-1, 0, 3, 5, 9, 12]
const target = 9
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      // 这里的-1或+1有两个作用
      // 1.之前已经排除掉了这个数，可以往前走一位
      // 2.等到后面临近数的时候，比如4、5，避免死循环一直在4
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  return -1
}
search(nums, target)
