// ### 第 67 题：数组编程题
// 随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。
// 解析：[第 67 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/113)

function getArr() {
  let arr = []
  while (arr.length < 10) {
    const num = Math.random() * 100
    arr.push(Math.floor(num))
  }
  arr = arr.sort((a, b) => a - b)
  const res = []
  console.log(arr)
  for (const item of arr) {
    const val = Math.floor(item / 10)
    if (!res[val]) {
      res[val] = []
    }
    res[val].push(item)
  }
  const res1 = []
  for (const item of res) {
    if (item) {
      res1.push(item)
    }
  }
  return res1
}
console.log(getArr())
