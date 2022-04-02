// ### 第 121 题：统计 1 ~ n 整数中出现 1 的次数。

// 例如统计 1 ~ 400W 出现 1 的次数。

// 解析：[第 121 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/237)

function getNum(num) {
  let i = 0
  let sum = 0
  while (i <= num) {
    const strList = i.toString().split('')
    for (const char of strList) {
      if (char === '1') {
        sum++
      }
    }
    i++
  }
  return sum
}

console.log(getNum(4000000))
