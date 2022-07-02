function Foo(userName) {
  this.userName = userName
}
Foo.prototype.getUserName = function () {
  return this.userName
}
console.log(Foo.getUserName())
