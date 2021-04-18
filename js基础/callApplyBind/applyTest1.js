function getGlobalObject() {
  return this
}

Function.prototype.applyTest = function (thisArg, argArray) {
  // 三个判断
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function')
  }
  if (thisArg === null || thisArg === undefined) {
    thisArg = getGlobalObject()
  }
  if (!argArray) {
    argArray = []
  }
}
