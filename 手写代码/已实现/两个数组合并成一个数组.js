// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
// 解析： [第 30 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39)

function convert() {
  let res = []
  const list1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
  const list2 = ['A', 'B', 'C', 'D']

  for (const item of list2) {
    const containList = list1.filter((subItem) => subItem.includes(item))
    res = [...res, ...containList, item]
  }

  return res
}

console.log(convert())
