// > 例如：121、1331 等
// 解析：[第 81 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/131)
function getNum() {
  const res = []
  for (let i = 1; i <= 1000; i++) {
    if (i > 10) {
      const str = i.toString().split('').reverse().join('')
      if (str === i.toString()) {
        res.push(i)
      }
    }
  }
  return res
}

console.log(getNum())
