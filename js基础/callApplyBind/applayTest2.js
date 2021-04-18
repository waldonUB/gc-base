let obj = {
  a: 1
}
function getGlobalObject() {
  return this
}
Function.prototype.myApply = function (instance, args) {
  if (typeof this !== 'function') {
    throw new TypeError('不是函数')
  }
  if (instance === null || instance === undefined) {
    instance = getGlobalObject()
  }
  if (typeof instance !== 'object' || typeof args !== 'object') {
    throw new TypeError('不是对象')
  }
  const fn = Symbol
  instance[fn] = this
  instance[fn](args)
}
function showTest(args) {
  // 如果不用apply的话，只能Math.max(p1, p2, p3, ...args)
  console.log(`最大的数：` + Math.max.apply(null, args))
  console.log(`Object的数${this.a}`)
}
showTest.myApply(obj, [1, 5, 3])
