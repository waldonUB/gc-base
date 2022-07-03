const treeArr = [
  {
    id: 9999,
    parentId: 0,
    children: [
      {
        id: 2,
        parentId: 9999,
        children: [
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
        ],
      },
      {
        id: 6,
        parentId: 9999,
      },
    ],
  },
]

const getArr = function (arr) {
  const resArr = []
  function getChildren(subArr) {
    let _subArr = []
    for (const item of subArr) {
      resArr.push({
        id: item.id,
        parentId: item.parentId,
      })
      if (item.children) {
        _subArr = _subArr.concat(item.children)
      }
    }
    if (_subArr.length) {
      getChildren(_subArr)
    }
  }
  getChildren(arr)
  return resArr
}
console.log(getArr(treeArr))
