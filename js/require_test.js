// import export_test from 'export'
// console.log(export_test.msg)
// (function () {
//     let arr = [1, 2, 3];
//     arr.filter(item => {
//         console.log(item);
//         return item === 1;
//     })
// }())
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//     getName() {
//         return this.name
//     }
// }
// let p = new Person('wdq')
// console.log(p.getName())
// console.log(p.name)
class JQuery {
    constructor(selector) {
        let slice = Array.prototype.slice
        let dom = slice.call(document.querySelectorAll(selector))
        let len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
}

window.$ = function (selector) {
    return new JQuery(selector)
}
