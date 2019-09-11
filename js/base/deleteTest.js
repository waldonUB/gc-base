// 删除全局作用域的普通变量，可以删除
// test = "w"
// console.log(delete test)
// console.log(test)

// 删除全局作用域的var,无法删除
// var test = "w"
// console.log(delete test)
// console.log(test)

// 删除函数作用域的var,无法删除
// var fn = function () {
//     var test = "w"
//     console.log(delete test)
//     console.log(test)
// }
// fn()

// 删除let, 无法删除
// let test = "w"
// console.log(delete test)
// console.log(test)

// 删除const, 无法删除
// const test = "w"
// console.log(delete test)
// console.log(test)

// 删除let声明的对象中的属性, 可以
// let obj = {
//     test: 'w'
// }
// console.log(delete obj.test)
// console.log(obj.test)

// 删除const声明的对象中的属性, 可以
// const obj = {
//     test: 'w'
// }
// console.log(delete obj.test)
// console.log(obj.test)
