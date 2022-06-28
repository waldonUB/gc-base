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

function bfs() {
  const res: string[] = []
  const rootArr = g_arr.filter((item) => item.parentId === 0)
  function getChildren(_arr: any[]) {
    const children = []
    for (const item of _arr) {
      res.push(item.name)
      for (const subItem of g_arr) {
        if (subItem.parentId === item.id) {
          children.push(subItem)
        }
      }
    }
    if (children.length) {
      getChildren(children)
    }
  }
  getChildren(rootArr)
  return res
}
console.log('bfs: ', bfs())
