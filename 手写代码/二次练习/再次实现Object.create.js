const MyCreate = function (target) {
  const Fn = function () {}
  Fn.prototype = target
  return new Fn()
}

const obj = {
  a: 1,
}

const extendObj = MyCreate(obj)
console.log(extendObj)
console.log(extendObj.a)
