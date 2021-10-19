const g_arr = [
  {
    id: 1,
    parentId: 0
  },
  {
    id: 2,
    parentId: 1
  },
  {
    id: 3,
    parentId: 2
  },
  {
    id: 4,
    parentId: 2
  },
  {
    id: 5,
    parentId: 2
  },
  {
    id: 6,
    parentId: 1
  }
]
// todo waldon 待完成

const getRoot = (arr) => {
  return arr.filter((item) => item.parentId === 0)
}

let treeArr = getRoot(g_arr)

const getChildren = (arr, treeArr) => {
  const _childArr = []
  for (const item of arr) {
    const child = treeArr.find((subItem) => subItem.id === item.parentId)
    console.log(`child的值：${JSON.stringify(child)}`)
    if (child) {
      _childArr.push(child)
      if (!treeArr.children) {
        treeArr.children = []
      }
      treeArr.children.push(child)
    }
  }
  if (!_childArr.length) {
    return
  }
  getChildren(arr, _childArr)
}
getChildren(g_arr, treeArr)
