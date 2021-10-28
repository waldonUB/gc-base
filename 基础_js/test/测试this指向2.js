var a = 5
function fn1() {
  var a = 6
  console.log(a)
  console.log(this.a)
}
function fn2(fn) {
  var a = 7
  fn()
}

var obj = {
  a: 8,
  getA: fn1
}
fn2(obj.getA)
