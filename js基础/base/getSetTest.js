// var obj = {
//     arr: ['wdq', 'ksl'],
//     name: 'waldon',
//     get getName() {
//         return this.arr[1]
//     },
//     get ['getFirName']() {
//         return this.arr[0]
//     },
//     get name() {
//         return this.arr[1]
//     }
// }
// console.log(obj.getName)
// console.log(obj.getFirName)
// console.log(obj.name)

// 'use strict'
// let obj = {
//     name: 'wdq',
//     get userName() {
//         return this.name
//     }
// }
// obj.name = 'waldon'
// console.log(obj.userName)

// 使用严格模式，如果只有get属性，赋值时会报TypeERROR的错误，obj.name为只读
'use strict'
let obj = {
    get age() {
        return '666?'
    },
    set age(val) {

    }
}
obj.age = 'waldon'
console.log(obj.age)
