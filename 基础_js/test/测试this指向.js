var a = 5
window.b = 5
const obj = {
  name: 'objName',
  aFn: function () {
    setTimeout(function () {
      console.log(`this`, this)
    }, 500)
  },
  bFn: function () {
    setTimeout(() => {
      console.log(`this2`, this.name)
    }, 500)
  }
}
// obj.aFn()
obj.bFn()
