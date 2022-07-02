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

/*
1. 去重常用的哈希表的方式
2. 判断存在相同的id就跳过

ts写法

interface arrItemDef {
  id: number
  pId?: number
  children?: Array<any>
}
interface initDef {
  id: number
  pId?: number
  children?: Array<any>
}

function convertTree(arr: initDef[]) {
  const map = new Map()
  const res = []
  for (const item of arr) {
    if (map.has(item.id)) {
      continue
    }
    map.set(item.id, item)
  }
  for (const [ket, item] of map) {
    // 这里连空和零一起判断
    if (map.get(item.pId)) {
      const cur = map.get(item.pId)
      cur.children = cur.children || []
      cur.children.push(item)
    } else {
      res.push(item)
    }
  }
  return res
}

*/
