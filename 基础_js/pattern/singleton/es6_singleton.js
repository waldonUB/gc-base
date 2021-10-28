class SingleObject {
  login() {
    console.log(`I am coming`)
  }
}
SingleObject.getInstance = (function () {
  let instance = null
  return function () {
    if (instance !== null) {
      instance = new SingleObject()
    }
    return instance
  }
})()
console.log('SingleObject :', SingleObject)
