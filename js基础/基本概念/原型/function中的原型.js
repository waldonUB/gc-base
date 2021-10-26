function foo() {
  console.log(this.count)
}
foo.count = '1'
foo.call(foo)
