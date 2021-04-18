let instance = {
  a: 1
}

function getGlobalObject() {
  return this
}

Function.prototype.myCall = function (instance, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this.name}不是一个函数`)
  }
  if (typeof instance !== 'object') {
    throw new TypeError(`${instance}不是一个对象`)
  }
  if (instance === null || instance === undefined) {
    instance = getGlobalObject()
  }
  const fn = Symbol
  instance[fn] = this
  instance[fn](...args)
}

function testShow(p1, p2) {
  console.log(`参数p1：${p1}`)
  console.log(`参数p2：${p2}`)
  console.log(`obj的参数：${this.a}`)
}
testShow.myCall(instance, 'ppp111', 'ppp222')
