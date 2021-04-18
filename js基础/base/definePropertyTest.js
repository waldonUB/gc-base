// 'use strict' 使用严格模式，会报TypeERROR的错误，obj.name为只读
// let obj = {
//     get age() {
//         return '666?'
//     },
//     set age(val) {
//
//     }
// }
// Object.defineProperty(obj, 'name', {
//     writable: true,
//     configurable: false,
//     enumerable: true,
//     value: 'waldon'
// })
// Object.defineProperty(obj, 'name', {
//     value: 'w'
// })
// obj.name = 'wdq'
// obj.age = 12
// // delete obj.name configurable为true时生效
// console.log(obj)
// console.log(Object.keys(obj))
// for (let item in obj) {
//     if (obj.hasOwnProperty(item)) {
//         console.log(obj[item])
//     }
// }
// var obj = {}
// function withValue(value) {
//     var d = withValue.d || (
//         withValue.d = {
//             enumerable: false,
//             writable: false,
//             configurable: false,
//             value: null
//         }
//     );
//     d.value = value;
//     return d;
// }
// Object.defineProperty(obj, 'key', withValue('static'))
var obj = {_name: 'waldon'}
Object.defineProperty(obj, 'name', {
    get() {
        return this._name
    }
})
obj._name = 'wdq'
console.log(obj.name)
