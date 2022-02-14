/**
 * 爬楼梯
 * 其实也是斐波那契数列的规律
 * @author waldon
 * @date 2022-02-14
 * @param {*} n -
 */
const getNum = function (n) {
  if (n === 0 || n === 1) {
    return n
  }
  return getNum(n - 1) + getNum(n - 2)
}

console.log(getNum(6))

// 1 1
// 2 11 2
// 3 111 12 21
// 4 1111 22 112 121 211
// 5 11111 122 221 212 1112 1211 1121 2111
