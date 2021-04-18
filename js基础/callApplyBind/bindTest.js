const obj = {
  a: 2
}
Function.prototype.myBind = function (instance) {
  let initArgs = Array.prototype.slice.call(arguments, 1)
  const that = this
  return function () {
    let secArgs = Array.prototype.slice.call(arguments)
    let allArgs = initArgs.concat(secArgs)
    return that.apply(instance, allArgs)
  }
}
function showTest() {
  console.log(this.a)
  console.log(arguments)
}
let showTest1 = showTest.myBind(obj, 1, 2)
showTest1()
