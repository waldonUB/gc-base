// 'use strict'
// a = 1
function list() {
  // 可以转换成一个真正的数组
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Example_Creating_shortcuts
  // arguments是个类数组对象，只能通过这种方式转
  let list = Array.prototype.slice.call(arguments)
  // console.log(this.a)
  return list
}
let list1 = list.bind(null, 5)
list1()
