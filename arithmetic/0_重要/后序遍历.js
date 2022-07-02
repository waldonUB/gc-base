const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
    },
    right: {
      val: 4,
    },
  },
  right: {
    val: 5,
    left: {
      val: 6,
    },
    right: {
      val: 7,
    },
  },
}

/*
          1
      2      5
    3   4  6   7

*/

function dfsTree(tree) {
  if (!tree) {
    return []
  }
  const res = []
  function getChildren(subTree) {
    if (!subTree) {
      return
    }
    getChildren(subTree.left)
    getChildren(subTree.right)
    res.push(subTree.val)
  }
  getChildren(tree)
  return res
}

function dfsTree2(tree) {
  if (!tree) {
    return []
  }
  const res = []
  const leftArr = dfsTree2(tree.left)
  const rightArr = dfsTree2(tree.right)
  res.push(tree.val)
  return [...leftArr, ...rightArr, ...res]
}

console.log(dfsTree(tree))
