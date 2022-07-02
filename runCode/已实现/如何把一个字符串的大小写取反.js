// ### 第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
// 解析：[第 69 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/116)

function getStr(str) {
  let resStr = ''
  for (let item of str) {
    if (item === item.toUpperCase()) {
      resStr += item.toLowerCase()
    } else {
      resStr += item.toUpperCase()
    }
  }
  return resStr
}

console.log(getStr('bBc'))
