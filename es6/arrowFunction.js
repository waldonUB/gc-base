// var f = () => {}
// // 相当于 var f1 = () => { return 2+ 4}
// var f1 = () => 2+ 4
// var f2 = (a = 2, b = 4) => a + 4
//
// console.log(f2(null , 4))
// 'use strict'
// function f(age) {
//     this.age = age
//     setTimeout(function () {
//         console.log('普通函数当前age：' + this.age)
//     }, 0)
//     setTimeout(() => {
//         console.log('箭头函数当前age：' + this.age)
//     }, 0)
// }
//
// var user = new f(12)

// function Person() {
//     this.age = 0;
//     var closure = "123"
//     setInterval(function growUp() {
//         console.log(this.age++)
//         console.log(closure)
//     }, 1000);
// }
//
// var p = new Person();
// 严格模式是什么关系？
// function PersonX() {
//     'use strict'
//     this.age = 0;
//     var closure = "123"
//     setInterval(()=>{
//         console.log(this.age++)
//         console.log(closure)
//     }, 1000);
// }

// var px = new PersonX();

// function f(...args) {
//    console.log(args)
// }
// f(1, 'w', {name: 'wdq'})
var a = ((i = 0) => {
  return () => ++i
})()
console.log(a())
