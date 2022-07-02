/**
 * 原型继承
 * @author waldon
 * @date 2022-02-16
 * @param {*} param - param
 */
const instanceExtend = function (target) {
  const Fn = function () {}
  Fn.prototype = target
  return new Fn()
}
