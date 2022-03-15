/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const sArr = s.split('')
  const newArr = []
  for (let i = 0; i < sArr.length; i++) {
    if (sArr[i] === '{' || sArr[i] === '[' || sArr[i] === '(') {
      newArr.push(sArr[i])
    } else {
      if (!newArr.length) {
        return false
      }
      const _char = newArr.pop()
      switch (sArr[i]) {
        case '}':
          if (_char !== '{') {
            return false
          }
          break
        case ')':
          if (_char !== '(') {
            return false
          }
          break
        case ']':
          if (_char !== '[') {
            return false
          }
      }
    }
  }
  return !newArr.length
}

// @lc code=end
