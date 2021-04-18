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
// console.log(Symbol('foo') === Symbol.for('foo')) // 无登记机制，会返回false
// console.log(Symbol.for('foo') === Symbol.for('foo')) // 返回一个已存在的Symbol，没有就新建

// 自己实现一个Symbol
// function SymbolTest(description) {
//     if (this instanceof SymbolTest) { // 这时候obj已经有了SymbolTest的prototype，调call方法的时候的this其实是obj
//         throw new Error('Symbol is not a constructor')
//     }
//     let obj = {} // 这里不能用Object.create(null)，因为不能用来当对象的key值;只能Object.create(Object)或{}
//     Object.defineProperties(obj, { // 这里可以让description不被重写
//         description: {
//             enumerable: false,
//             configurable: false,
//             writable: false,
//             value: description || undefined
//         }
//     })
//     return obj
// }
// SymbolTest.for = (function () { // 这个方法是在原型上的？
//     var keyArr = []
//     return function (key) {
//         var keyObj = keyArr.find(item => item.key === key)
//         if (!keyObj) {
//             keyObj = {key: key}
//             keyArr.push(keyObj)
//         }
//         return keyObj
//     }
// }())
// var symbol = SymbolTest('waldon')
// var symbol1 = SymbolTest()
// var symbol2 = SymbolTest('waldon')
// var symbol3 = SymbolTest.for('ksl')
// var symbol4 = SymbolTest.for('ksl')
// var symbol5 = SymbolTest.for('waldon')
// let obj = {}
// obj[symbol3] = 'waldon'
// console.log(symbol === symbol2) // 独一无二
// console.log(symbol3 === symbol4) // for生成的相等
// console.log(symbol3 === symbol5)
// console.log(obj[symbol3]) // 可以当做独一无二的key
// console.log(symbol1 instanceof SymbolTest) // false，没有继承关系
// console.log('string' + symbol1) // 不能与其他值运算，这一点还没有实现
// // Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，
// // 也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回,
// // 这一点也实现不了
// console.log(Object.keys(obj).length)
// symbol.description = 'wdq'
// console.log(symbol.description)

// 要实例化才能使用prototype上的属性和方法
// var prototypeTest = function () {
//
// }
// prototypeTest.prototype.for = function () {
//     console.log(`I am for`)
// }
// new prototypeTest().for()
