/**
 * 双for
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let resArr = [0, 0]
  for (let index = 0; index < nums.length; index++) {
    let item = nums[index]
    resArr[0] = index
    const subArr = nums.slice(index + 1)
    for (let subIndex = 0; subIndex < subArr.length; subIndex++) {
      let subItem = subArr[subIndex]
      if (subItem + item === target) {
        resArr[1] = subIndex + index + 1
        return resArr
      }
    }
  }
  return resArr
}

/**
 * 哈希表
 * @author waldon
 * @date 2022-03-08
 */
var twoSumHash = function (nums, target) {
  const map = new Map()
  for (let index = 0; index < nums.length; index++) {
    const _val = target - nums[index]
    if (map.has(_val)) {
      return [map.get(_val), index]
    }
    map.set(nums[index], index)
  }
}
