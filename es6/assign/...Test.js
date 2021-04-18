// 扩展运算符
// function f() {
//   return {
//     a: 'foo',
//     b: 'bar'
//   }
// }
// const o = {
//   d: '888'
// }
// const obj = {
//   c: '666',
//   ...f(),
//   ...o
// }
// console.log(obj)
// console.log({...o})

let obj = {
  a: '88'
}
let obj2 = {
  c: '997'
}
let obj1 = { ...obj, ...obj2 }
obj1.a = '99'
console.log(obj1)
