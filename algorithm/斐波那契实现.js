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
// console.log(getAllRes(6))

/**
 * 动态规划
 * @author waldon
 * @date 2022-02-13
 * @param {*} n - param
 */
const feibo_for1 = function (n) {
  const MOD = 1000000007 // int范围内需要取模
  let res = [0, 1]
  for (let i = 2; i <= n; i++) {
    res[i] = (res[i - 1] + res[i - 2]) % MOD
  }
  return res[n]
}

console.log(feibo_for1(5))

/**
 * 动态规划使用局部变量
 * @author waldon
 * @date 2022-02-13
 * @param {*} n
 */
const feibonaqi_while = function (n) {
  let n1 = 0
  let n2 = 1
  if (n === 1) {
    return n1
  }
  if (n === 2) {
    return n2
  }
  let sum
  for (let i = 3; i <= n; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
  }
  return sum
}
// console.log(feibonaqi_while(5))
