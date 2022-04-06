// ### 第 110 题：编程题，请写一个函数，完成以下功能

// > 输入
// > ``'1, 2, 3, 5, 7, 8, 10'``
// > 输出
// > ``'1~3, 5, 7~8, 10'``

// 解析：[第 110 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/201)

function getStr(str) {
  const res = []
  const strArr = str.split(',').map((item) => Number(item))
  let start = strArr[0]
  let last = strArr[0]
  for (let i = 0; i < strArr.length; i++) {
    if (last + 1 !== strArr[i + 1]) {
      if (start !== strArr[i]) {
        res.push(`${start}~${strArr[i]}`)
      } else {
        res.push(strArr[i])
      }
      start = strArr[i + 1]
    }
    last = strArr[i + 1]
  }
  return res
}

console.log(getStr('1, 2, 3, 5, 7, 8, 10'))

// 1
