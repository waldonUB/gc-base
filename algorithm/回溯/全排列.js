// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]
// 链接：https://leetcode-cn.com/problems/permutations

// 已实现，可以再优化
const arr = [1, 2, 3]
const permute = (arr) => {
  const res = []
  const getSubChildren = (preArr, curArr) => {
    for (let i = 0, len = curArr.length; i < len; i++) {
      const _curArr = [...curArr]
      const _preArr = [...preArr]
      const item = _curArr[i]
      _preArr.push(item)
      _curArr.splice(i, 1)
      if (_curArr.length) {
        getSubChildren(_preArr, _curArr)
      } else {
        res.push(_preArr)
      }
    }
  }
  getSubChildren([], arr)
  return res
}
console.log(permute(arr))
/*
1、先for循环，把每一项列出来
2、然后剩下的就是[2,3]、[1,3]、[1,2]
3、再递归下去，直接数组长度为1
4、组合已终止条件的数组
*/
