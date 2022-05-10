const g_arr = [
  {
    id: 1,
    parentId: 0,
    name: 'a',
  },
  {
    id: 2,
    parentId: 1,
    name: 'b',
  },
  {
    id: 3,
    parentId: 2,
    name: 'd',
  },
  {
    id: 4,
    parentId: 2,
    name: 'e',
  },
  {
    id: 5,
    parentId: 2,
    name: 'f',
  },
  {
    id: 6,
    parentId: 1,
    name: 'c',
  },
]

function convertTree(arr) {
  const map = new Map()
  for (const item of arr) {
    map.set(item.id, item)
  }
  let res = []
  for (const item of arr) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (map.has(item.parentId)) {
      map.get(item.parentId).children = map.get(item.parentId).children || []
      map.get(item.parentId).children.push(item)
    }
  }
  return res
}
const treeArr = convertTree(g_arr)

function bfsTree(treeArr) {
  const res = []
  function getChildren(subArr) {
    const subChildren = []
    for (const item of subArr) {
      res.push(item.name)
      if (item.children && item.children.length) {
        subChildren.push(...item.children)
      }
    }
    if (subChildren.length) {
      getChildren(subChildren)
    }
  }
  getChildren(treeArr)
  return res
}
console.log(bfsTree(treeArr))
