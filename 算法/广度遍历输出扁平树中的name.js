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

const translateName = function (arr) {
  const rootList = arr.filter((item) => item.parentId === 0)
  arr = arr.filter((item) => item.parentId !== 0)

  function getChildren(subArr) {
    for (const item of subArr) {
      const subList = arr.filter((subItem) => subItem.parentId === item.id)
      arr = arr.filter((subItem) => subItem.parentId !== item.id)
      if (subList.length) {
        item.children = subList
        getChildren(subList)
      }
    }
  }

  const nameArr = []
  function getName(treeList) {
    let childrenArr = []
    for (const item of treeList) {
      nameArr.push(item.name)
      if (item.children && item.children.length) {
        childrenArr = childrenArr.concat(item.children)
      }
    }
    if (!childrenArr.length) {
      return
    }
    getName(childrenArr)
  }

  getChildren(rootList)
  getName(rootList)

  return nameArr
}

console.log(JSON.stringify(getTree(g_arr)))
