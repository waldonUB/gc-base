// ### 第 71 题： 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。
// 解析：[第 71 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/119)

function getPosition(S, T) {
  const sArr = S.split('')
  const tArr = T.split('')
  let start = 0
  for (let i = 0, len = sArr.length; i < len; i++) {
    if (sArr[i] === tArr[start]) {
      start++
    } else {
      start = 0
    }
    if (start === tArr.length - 1) {
      return i
    }
  }
}
console.log(getPosition('abcdefg', 'ef'))
