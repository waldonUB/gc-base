// ### 第 102 题：不用加减乘除运算符，求整数的7倍

// 解析：[第 102 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/161)

const addFn = function (m) {
  let res = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < 7; j++) {
      res.push(1)
    }
  }
  return res.length
}

const addFnByBit = function (m) {
  const res = new Array(m << 3)
  // for (let i = 0; i < m; i++) {
  //   res.pop()
  // }
  res.splice(0, m)
  return res.length
}

console.log(addFnByBit(5))
