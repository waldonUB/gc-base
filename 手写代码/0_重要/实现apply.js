/**
 * 实现apply
 * @author waldon
 * @date 2022-01-25
 */
Function.prototype.myApply = function (_this, args) {
  if (!_this) {
    _this = window || Global
  }
  _this.fn = this
  _this.fn(...args)
  _this.fn = ''
}
window.z = 1
const bar = function (x, y) {
  console.log('x y z', x + y + this.z)
}

const obj2 = {
  z: 6,
}

bar.myApply(obj2, [4, 5])
