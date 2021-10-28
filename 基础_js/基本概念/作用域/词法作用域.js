function foo() {
  console.log(a) // 输出2，因为词法作用域的一个重要特性是，代码引用的变量环境是在定义的时候的
}
function bar() {
  var a = 3
  foo()
}
var a = 2
bar()
