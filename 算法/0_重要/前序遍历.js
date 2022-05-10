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

const preOrderFn = (tree) => {
  const res = []
  const subOrderFn = (root) => {
    if (!(root && root.val)) {
      return
    }
    res.push(root.val)
    subOrderFn(root.left)
    subOrderFn(root.right)
  }
  subOrderFn(tree)
  return res
}

console.log(`前序输出`, preOrderFn(tree))
