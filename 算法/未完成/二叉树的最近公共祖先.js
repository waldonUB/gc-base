/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  function getPath(node, child, path = []) {
    if (!node) {
      return path
    }
    path.push(node)
    if (node.val === child.val) {
      return path
    }
    getPath(node.left, path)
    getPath(node.right, path)
    return path
  }

  const pPath = getPath(root, p)
  const qPath = getPath(root, q)

  if (qPath.length > pPath.length) {
    ;[pPath, qPath] = [qPath, pPath]
  }
  let last
  for (let i = 0; i < qPath.length; i++) {
    if (pPath[i].val === qPath[i].val) {
      last = qPath[i]
    } else if (i === qPath.length - 1) {
      let n = i + 1
      let flag = false
      while (pPath[n] && !flag) {
        if (qPath[i].val === pPath[n].val) {
          last = qPath[i]
          flag = true
        }
        n++
      }
    } else {
      return
    }
  }
  return last
}
// @lc code=end
