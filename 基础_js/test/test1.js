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
  {
    id: 7,
    parentId: 3,
    name: 'g',
  },
]
const getTree = function (arr) {
  const rootList = arr.filter((item) => item.parentId === 0)

  const setChildren = function (subArr) {
    for (const item of subArr) {
      item.children = arr.filter((subItem) => subItem.parentId === item.id)
      if (item.children && item.children.length) {
        setChildren(item.children)
      }
    }
  }
  setChildren(rootList)

  return rootList
}

const getTree_dp = function (arr) {
  const resArr = []
  const map = new Map()
  for (const item of arr) {
    map.set(item.id, item)
  }
  for (const item of arr) {
    if (item.parentId === 0) {
      resArr.push(item)
      continue
    }
    map.get(item.parentId).children = map.get(item.parentId).children || []
    map.get(item.parentId).children.push(item)
  }
  return resArr
}

console.log(JSON.stringify(getTree_dp(g_arr)))
