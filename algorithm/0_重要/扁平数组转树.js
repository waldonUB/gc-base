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

/**
 * 层序遍历转树
 * @author waldon
 * @date 2022-04-26
 */
function convertBfs(arr) {
  const res = arr.filter((item) => item.parentId === 0)
  function getChildren(_arr) {
    const subRes = []
    for (const item of _arr) {
      const children = arr.filter((subItem) => item.id === subItem.parentId)
      if (children && children.length) {
        item.children = children
        subRes.push(...children)
      }
    }
    if (subRes.length) {
      getChildren(subRes)
    }
  }
  getChildren(res)

  return res
}

// console.log(`深度遍历扁平数组转树：${JSON.stringify(treeArr)}`)
console.log(`bfs转树：${JSON.stringify(convertBfs(g_arr))}`)
