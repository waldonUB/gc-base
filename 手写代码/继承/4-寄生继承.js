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

/**
 * 寄生继承
 * @author waldon
 * @date 2022-02-16
 * @param {*} param - param
 */
const extendFn = function (target) {
  const obj = instanceExtend(target)
  obj.say = function () {}
  return obj
}
