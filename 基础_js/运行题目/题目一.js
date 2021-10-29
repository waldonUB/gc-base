function Foo() {
  getName = function () {
    console.log(1)
  }
  console.log(`this的指向`, this)
  return this
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4)
}
function getName() {
  console.log(5)
}

//请写出以下输出结果：
Foo.getName() // 直接输出2
getName() // 函数声明提到最前，然后被函数表达式覆盖
Foo().getName() // 浏览器下运行，this指向window
getName() // 函数中的getName没有写var之类的，直接被提到了全局
new Foo.getName() // new (Foo.getName())
new Foo().getName() // (new Foo()).getName()
new new Foo().getName() // new (new Foo().getName())

// waldon
// 2 4 1 1 2 3 3
