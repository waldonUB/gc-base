const obj = {
  a: 10,
  foo: function (obj) {
    console.log(`foo`, this.a)
    obj.bar()
  },
}
const obj2 = {
  a: 20,
  bar: function () {
    console.log(this.a)
  },
}
obj.foo(obj2)
