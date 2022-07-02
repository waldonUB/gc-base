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

const getName = function (arr) {
  const rootList = arr.filter((item) => item.parentId === 0)
  const resArr = []
  function getChildren(subArr) {
    let _arr = []
    for (const item of subArr) {
      resArr.push(item.name)
      const children = arr.filter((subItem) => subItem.parentId === item.id)
      if (children.length) {
        _arr = [..._arr, ...children]
      }
    }
    if (_arr.length) {
      getChildren(_arr)
    }
  }
  getChildren(rootList)
  return resArr
}

const getName2 = function (arr) {
  const rootList = arr.filter((item) => item.parentId === 0)
  const resArr = []
  const map = new Map()
  for (const item of arr) {
    map.set(item.id, item)
  }

  for (const item of arr) {
  }
  return resArr
}

console.log(getName(g_arr))
