var a = 10
var foo = {
  a: 20,
  bar: function () {
    var a = 30
    return this.a
  }
}
foo.bar()
console.log(foo.bar())
console.log((foo.bar = foo.bar)())
console.log((foo.bar, foo.bar)())
