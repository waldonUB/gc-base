Function.prototype.callTest = function (thisArg, argArray) {
  // 相当于obj.fn = test1
  thisArg.fn = this
  thisArg.fn()
}

function test1() {
  console.log(this.a)
}

let obj = {
  a: 1
}

test1.callTest(obj)
