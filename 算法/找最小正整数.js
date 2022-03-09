var getMinNum = function (nums) {
  var set = new Set(nums)
  for (let i = 1; i <= nums.length + 1; i++) {
    if (!set.has(i)) {
      return i
    }
  }
}

const nums = [1, , 3, 4]

const set = new Set(nums)
console.log('set', set)
console.log(set.has(5))
console.log(set.has(4))
