Function.prototype.myCall = function (target, ...args) {
  target.fn = this
  target.fn(...args)
  target.fn = ''
}

Function.prototype.myApply = function (target, arr) {
  target.fn = this
  target.fn(...arr)
  target.fn = ''
}

Function.prototype.myBind = function (target) {
  const _this = this

  return function (...args) {
    target.fn = _this
    target.fn(...args)
    target.fn = ''
    // _this.call(target, ...args)
  }
}

const obj = {
  a: 1,
}

const Fn = function (params, params2) {
  console.log(this.a)
  console.log(params)
  console.log(params2)
}

const bind1 = Fn.myBind(obj)

bind1(['waldon', 'waldon2'])
// Fn.myCall(obj, 'waldon')
// Fn.myApply(obj, ['waldon', 'waldon2'])
