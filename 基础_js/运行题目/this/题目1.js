var num = 10
var obj = {
  num: 8,
  inner: {
    num: 6,
    print: function () {
      console.log(this.num)
    },
  },
}
num = 888
obj.inner.print()
var fn = obj.inner.print
fn()
obj.inner.print()
;(obj.inner.print = obj.inner.print)()
