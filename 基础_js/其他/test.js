const g_arr = [
  {
    id: 1,
    parentId: 0,
  },
  {
    id: 2,
    parentId: 1,
  },
  {
    id: 3,
    parentId: 2,
  },
  {
    id: 4,
    parentId: 2,
  },
  {
    id: 5,
    parentId: 2,
  },
  {
    id: 6,
    parentId: 1,
  },
]

function convertArr2Tree(arr) {
  const rootArr = arr.filter((item) => item.parentId === 0)
  function getChildren(subArr) {
    const subRes = []
    for (const item of subArr) {
      const children = arr.filter((subItem) => subItem.parentId === item.id)
      if (children.length) {
        item.children = children
        subRes.push(...children)
      }
    }
    if (subRes.length) {
      getChildren(subRes)
    }
  }
  getChildren(rootArr)
  return rootArr
}
console.log(convertArr2Tree(g_arr))
