/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let arr = []
  let maxLength = 0
  for (let i = 0; i < nums.length; ) {
    const item = nums[i]
    if (!arr.length || arr[arr.length - 1] < item) {
      arr.push(item)
      if (arr.length > maxLength) {
        maxLength = arr.length
      }
      i++
    } else {
      arr = []
    }
  }
  return maxLength
}
