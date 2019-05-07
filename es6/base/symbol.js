// Symbol.prototype.description = 'a'
// let s  = Symbol()
// let a  = Symbol()
// console.log(a.description) // es2019的写法

// var a = Symbol()
// var obj = {
//     // a: 'hello'
// }
// // 只能通过obj[]的方式传值和获取，
// // 在for i和for of中无法取值，只能通过Object.getOwnPropertySymbols(obj)
// obj[a] = 'hi'
// for(let item in obj) {
//     console.log(item)
// }
// var b = Object.getOwnPropertySymbols(obj)
// console.log(obj)
console.log(Symbol('foo') === Symbol.for('foo')) // 无登记机制，会返回false
console.log(Symbol.for('foo') === Symbol.for('foo')) // 返回一个已存在的Symbol，没有就新建
