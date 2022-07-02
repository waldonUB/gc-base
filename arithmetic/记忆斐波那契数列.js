// 题目：斐波那契数列指的是类似于以下的数列：

// 1, 1, 2, 3, 5, 8, 13, ....

// 也就是，第 n 个数由数列的前两个相加而来：f(n) = f(n - 1) + f(n -2)

// 请你完成 fibonacci 函数，接受 n 作为参数，可以获取数列中第 n 个数，例如：

/**
 * 斐波那契
 * @author waldon
 * @date 2021-10-31
 * @param {*} n - param
 */
function foo(n) {
  if (n < 1) {
    throw Error('请输入正确的数值')
    return
  }
  const _n = n - 1
  function getChild(_n) {
    if (_n === 0 || _n === 1) {
      return 1
    }
    return getChild(_n - 1) + getChild(_n - 2)
  }
  return getChild(_n)
}
console.log(foo(6))
