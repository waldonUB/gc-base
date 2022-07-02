Function.prototype.myBind = function (_this, ...args) {
  if (_this === null || _this === undefined) {
    _this = window
  }
  _this.fn = this
  return function (...args2) {
    _this.fn(...args, ...args2)
  }
}

window.z = 999
const foo = function (x, y) {
  console.log('this', this)
  console.log('this.z + x + y : ', this.z + x + y)
}

const obj = {
  z: 10,
}

const bar = foo.myBind('', 100)
// const bar = foo.bind(1, 100)

bar(1, 2)
