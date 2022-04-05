// ### 第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。

// 示例 1：

// ```js
// nums1 = [1, 3]
// nums2 = [2]
// ```

// 中位数是 2.0

// 示例 2：

// ```js
// nums1 = [1, 2]
// nums2 = [3, 4]
// ```

// 中位数是(2 + 3) / 2 = 2.5

// 解析：[第 93 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/144)

/**
 * 非正确题解
 * hard难度的先不刷
 * @author waldon
 * @date 2022-04-02
 */
function getMiddleNum(arr1, arr2) {
  let fast = 0
  let slow = 0
  const [fastArr, slowArr] = arr1.length < arr2.length ? [arr2, arr1] : [arr1, arr2]
  const allLength = arr1.length + arr2.length
  while (fast < fastArr.length && fast + slow < allLength / 2) {
    if (fastArr[fast] === slowArr[slow]) {
      fast++
      slow++
    } else if (fastArr[fast] < slowArr[slow]) {
      fast++
    } else {
      slow++
    }
  }
  if (allLength % 2) {
    if (fast % 2) {
      return fastArr[fast]
    } else {
      return slowArr[slow]
    }
  } else {
    return (fastArr[fast] + slowArr[slow]) / 2
  }
}

console.log(getMiddleNum([1, 3], [2, 4]))
