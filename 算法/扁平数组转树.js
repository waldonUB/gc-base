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
const getRoot = (arr) => {
  return arr.filter((item) => item.parentId === 0)
}

let treeArr = getRoot(g_arr)

/**
 * 层序遍历
 * @author waldon
 * @date 2021-10-19
 * @param {*} arr - param
 * @param {*} treeArr - param
 */
const wideGetChildren = (arr, treeArr) => {
  let _childArr = []
  for (const item of arr) {
    const child = treeArr.find((subItem) => subItem.id === item.parentId)
    if (child) {
      _childArr.push(item)
      if (!child.children) {
        child.children = []
      }
      child.children.push(item)
    }
  }
  if (!_childArr.length) {
    return
  }
  getChildren(arr, _childArr)
}

// wideGetChildren(g_arr, treeArr)

// console.log(`层序遍历扁平数组转树：${JSON.stringify(treeArr)}`)

/**
 * 深度遍历
 * @author waldon
 * @date 2021-10-19
 * @param {*} arr - param
 * @param {*} treeArr - param
 */
const deepGetChildren = (arr, treeNode) => {
  for (const item of arr) {
    if (treeNode.id === item.parentId) {
      if (!treeNode.children) {
        treeNode.children = []
      }
      treeNode.children.push(item)
      deepGetChildren(arr, item)
    }
  }
}

/**
 * 优化递归的方式
 * @author waldon
 * @date 2022-03-19
 * @param {*} arr - param
 */
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

deepGetChildren(g_arr, treeArr[0]) // 暂时默认为只有一个节点

console.log(`深度遍历扁平数组转树：${JSON.stringify(treeArr)}`)
