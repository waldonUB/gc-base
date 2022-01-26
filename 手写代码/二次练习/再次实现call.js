/**
 * 实现call
 * @author waldon
 * @date 2022-01-25
 */
Function.prototype.myCall = function (_this, ...args) {
  _this.fn = this
  _this.fn(...args)
  _this.fn = ''
}

const foo = function (x, y) {
  console.log('x y z', x + y + this.z)
}

const obj = {
  z: 3,
}

foo.myCall(obj, 1, 2)
