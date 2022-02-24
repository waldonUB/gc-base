// https://github.com/mqyqingfeng/Blog/issues/42

/**
 * 函数柯里化
 * @author waldon
 * @date 2022-02-24
 * @param {*} param - param
 */
const myCurry = function (fn, ...args) {
  return function (...params) {
    args = [...args, ...params]
    if (args.length < fn.length) {
      return myCurry(fn, ...args)
    } else {
      return fn.apply(this, args)
    }
  }
}
