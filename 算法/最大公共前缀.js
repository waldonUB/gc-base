/**
 * 最大公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const res = [strs[0]]
  for (let i = 1; i <= strs.length - 1; i++) {
    let str = ''
    for (let j = 0; j <= res[i - 1].length; j++) {
      if (res[i - 1].substring(0, j) === strs[i].substring(0, j)) {
        str = res[i - 1].substring(0, j)
      }
    }
    res[i] = str
    if (str === '') {
      return ''
    }
  }
  return res[strs.length - 1]
}
console.log(longestCommonPrefix(['long', 'lo', 'longsss']))
