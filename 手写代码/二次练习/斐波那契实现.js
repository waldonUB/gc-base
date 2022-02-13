/**
 * 斐波那契求第n个数的值
 * @author waldon
 * @date 2022-02-13
 * @param {*} n - param
 */
const feibonaqi = function (n) {
  if (typeof n !== 'number' || n < 1) {
    throw Error('非有效数字')
  }
  if (n === 1 || n === 2) {
    return n - 1
  }
  return feibonaqi(n - 1) + feibonaqi(n - 2)
}

/**
 * 斐波那契求第n个数之和
 * @author waldon
 * @date 2022-02-13
 * @param {*} n - param
 */
const getAllRes = function (n) {
  let res = 0
  const feibonaqi = function (n) {
    if (typeof n !== 'number' || n < 1) {
      throw Error('非有效数字')
    }
    if (n === 1 || n === 2) {
      return n - 1
    }
    return feibonaqi(n - 1) + feibonaqi(n - 2)
  }
  for (let i = 1; i <= n; i++) {
    res += feibonaqi(i)
  }
  return res
}
console.log(getAllRes(6))
