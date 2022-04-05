// 如何将`[{id: 1}, {id: 2, pId: 1}, ...]` 的重复数组（有重复数据）转成树形结构的数组 `[{id: 1, child: [{id: 2, pId: 1}]}, ...]` （需要去重）

// 解析：[第 125 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/243)

function convertTree(arr) {
  const res = []
  const map = new Map()
  for (const item of arr) {
    map.set(item.id, item)
  }
  for (const [key, value] of map) {
    if (!value.pId) {
      res.push(value)
    } else {
      const parent = map.get(value.pId)
      parent.child = parent.child || []
      parent.child.push(value)
    }
  }
  return res
}
const arr = [
  { id: 1 },
  { id: 2, pId: 1 },
  { id: 3, pId: 2 },
  { id: 4 },
  { id: 3, pId: 2 },
  { id: 5, pId: 4 },
]

console.log(convertTree(arr))
