const obj = {
  a: 1,
  b: 2
}

Function.prototype.myCall = function (thisArg, ...argArray) {
  this.prototype = Object.create(instance)
  this.prototype.constructor = instance
  this(args)
}

function test() {
  console.log(`执行test`)
  console.log(`args: ` + arguments[0])
  console.log(`this: ` + this.a)
}

test.myCall(obj, 3, 4)
