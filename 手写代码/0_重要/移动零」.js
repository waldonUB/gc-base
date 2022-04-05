// > 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// >
// > 示例:
// >
// > ```
// > 输入: [0,1,0,3,12]
// > 输出: [1,3,12,0,0]
// > ```
// >
// > 说明:
// >
// > 1. 必须在原数组上操作，不能拷贝额外的数组。
// >
// > 1. 尽量减少操作次数。
// 解析：[第 82 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/132)

const moveLast = function (arr) {
  let len = arr.length
  while (len) {
    if (arr[len - 1] === 0) {
      arr.splice(len - 1, 1)
      arr.push(0)
    }
    len--
  }
  return arr
}
console.log(moveLast([0, 1, 0, 0, 3, 12]))
