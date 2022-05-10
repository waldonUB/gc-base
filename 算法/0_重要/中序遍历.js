// waldon 实现

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

/**
 * 第二次实现
 * @author waldon
 * @date 2022-05-10
 * @param {*} tree - param
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
    res.push(subTree.val)
    getChildren(subTree.right)
  }
  getChildren(tree)
  return res
}

const preOrderFn = (tree) => {
  const res = []
  const subOrderFn = (root) => {
    if (!(root && root.val)) {
      return
    }
    subOrderFn(root.left)
    res.push(root.val)
    subOrderFn(root.right)
  }
  subOrderFn(tree)
  return res
}

console.log(`中序输出`, dfsTree(tree))
