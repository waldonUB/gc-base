/**
 * 函数声明和函数表达式
 * */
fn1()
var fn1 = function () { // var存在变量提升
  console.log(`我是函数表达式`)
}

function fn1() { // 如果函数表达式是undefined就用函数声明
  console.log(`我是函数声明`)
}
fn1()

var getName//变量被提升，此时为undefined

getName()//oaoafly 函数被提升 这里受函数声明的影响，虽然函数声明在最后可以被提升到最前面了
var getName = function() {
  console.log('wscat')
}//函数表达式此时才开始覆盖函数声明的定义
getName()//wscat
function getName() {
  console.log('oaoafly')
}
getName()//wscat 这里就执行了函数表达式的值
