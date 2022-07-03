const g_arr = [
  {
    id: 1,
    children: [
      {
        id: 2
      },
      {
        id: 3
      }
    ]
  },
  {
    id: 6,
    children: [
      {
        id: 4,
        children: [
          {
            id: 7
          },
          {
            id: 8
          }
        ]
      },
      {
        id: 5
      }
    ]
  }
]

const translateArr = []

/**
 * 深度遍历
 * @author waldon
 * @date 2021-10-19
 * @param {*} arr - param
 */
const deepGetArr = (arr) => {
  arr.forEach((item) => {
    if (item.children?.length) {
      getArr(item.children)
    }
    item.children = null
    translateArr.push(item)
  })
}
deepGetArr(g_arr)
console.log(`深度遍历树转数组：${JSON.stringify(translateArr)}`)

/**
 * 层序遍历
 * @author waldon
 * @date 2021-10-19
 * @param {*} arr - param
 */
const wideGetArr = (arr) => {
  let _childArr = []
  arr.forEach((item) => {
    if (item.children?.length) {
      _childArr = _childArr.concat(item.children)
    }
    item.children = null
    translateArr.push(item)
  })
  if (!_childArr.length) {
    return
  }
  wideGetArr(_childArr)
}
wideGetArr(g_arr)
console.log(`层序遍历树转数组：${JSON.stringify(translateArr)}`)
