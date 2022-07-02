/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const map = new Map()
  function getChildren(_coins, _amount) {
    if (_amount === 0) {
      return 0
    }
    if (_amount < 0) {
      return -1
    }
    if (map.has(_amount)) {
      return map.get(_amount)
    }
    let res = Number.MAX_VALUE
    for (const item of _coins) {
      let sub = getChildren(_coins, _amount - item)
      if (sub === -1) {
        continue
      }
      res = Math.min(res, sub + 1)
    }
    map.set(_amount, res === Number.MAX_VALUE ? -1 : res)
    return map.get(_amount)
  }
  return getChildren(coins, amount)
}
