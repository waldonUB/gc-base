// (function init() {
//     var name = 'wdq'
//     function showName() {
//         console.log(name)
//     }
//     showName()
// }())
// function init() {
//     var name = 'wdq'
//     function displayName() {
//         console.log(name)
//     }
//     return displayName
// }
// var myInit = init()
// myInit()
// function varParam() {
//     console.log(i)
//     for (var i = 0; i < 5; i++) {
//         // (function f() {
//         //     console.log(i)
//         // })()
//         setTimeout(function () {
//             console.log(i)
//         })
//     }
// }
// varParam()
// 'use strict'
// function f() {
//     y = 1
//     var y, x = 2
//     x = y = 5
// }
// var a = 5
//
// f()
// console.log(y)
// console.log(x)

// var x = 1
// function f() {
//     x = 2
//     console.log(x)
// }
// f()
// console.log(x)

// (function f() {
//     var x = function () {
//         console.log(a)
//     }
//     var a = 1
//     x()
// })()

// var adder = function (x) {
//     return function (y) {
//         return x + y
//     }
// }
//
// var add1 = adder(10)
// var add2 = adder(20)
//
// console.log(add1(5))
// console.log(add2(5))

// 循环赋值
// function buildList(list) {
//     var result = []
//     for (var i = 0; i < list.length; i++) {
//         var item = 'item' + list[i]
//         result.push(function () {
//             console.log(item + list[i])
//         })
//     }
//     return result
// }
//
// (function testList() {
//     var fnList = buildList([1, 2, 3])
//     for (var i = 0; i < fnList.length; i++) {
//         fnList[i]()
//     }
// })()

// function newClosure(someNum, someRef) {
//     var num = someNum
//     var anArray = [1, 2, 3]
//     var ref = someRef
//     return function (x) {
//         num += x
//         anArray.push(num)
//         console.log(`num` + num + `anArray` + anArray.toString() + `ref.someVar` + ref.someVar)
//     }
// }
//
// var closure1 = newClosure(40, {someVar: 'closure1'})
// var closure2 = newClosure(100, {someVar: 'closure2'})
//
// closure1(5)
// closure2(10)

// 单例
// var singleton = function f() {
//     var privateVariable
//     function privateFunction() {
//
//     }
// }()

// 闭包var
// (function f() {
//     for (var i = 0; i < 5; i++) {
//         setTimeout(function () {
//             console.log(i)
//         })
//     }
// })()

// (function f() {
//
//     function f1() {
//         var i = 5
//     }
//     console.log(i)
// })()

// 把i当做局部变量
// (function f() {
//     for (var i = 0; i < 5; i++) {
//         (function f1(i) {
//             setTimeout(function () {
//                 console.log(i)
//             })
//         })(i)
//     }
// })()

// this指向调用对象,通常是通过.的方式

// (function f() {
//     var obj = {}
//     obj.sq = 5
//     obj.f = function () {
//         return this.sq
//     }
//     console.log(obj.f())
// })()


// js中 var functionName = function() {} 和 function functionName() {} 两种函数声明的区别
// https://www.cnblogs.com/alkq1989/p/5556771.html
// var x = function f() {
//     console.log(666)
// }
// x() // 函数外的只有x，不是f
// console.log(x.name)

// 通过apply  call  bind指定绑定对象
// value = 2
// // var obj = {value: 1}
// // var foo = function f() {
// //     return this.value
// // }
// // console.log(foo.apply(obj))
// // console.log(foo.call(obj))
// // var newObj = foo.bind(obj)
// // console.log(newObj())
// // console.log(foo()) // 没有调用对象就指向全局

// var obj = {}
// var obj1 = {}
// var arr = []
// var arr1 = []
// var fn = function(){}
// var fn1 = new fn()
// var promise = new Promise(function (resolve, reject) {
//
// })
// var reg = /w/
// console.log(obj === obj1)
// console.log(arr === arr1)
// console.log(typeof obj)
// console.log(typeof arr)
// console.log(typeof fn)
// console.log(typeof fn1)
// console.log(typeof promise)

// 浅拷贝
// var obj = {
//     name: 'wdq',
//     userInfo: {
//         age: 18
//     }
// }
// var obj2 = obj
// function shallow(obj) {
//     var newObj = {}
//     for (let field in obj) {
//         if (obj.hasOwnProperty(field)) {
//             newObj[field] = obj[field]
//         } else {
//             console.log(field)
//         }
//     }
//     return newObj
// }
// var newObj = shallow(obj)
// obj2.name = 'ksl'
// newObj.name = 'www'
// newObj.userInfo.age = 22
// console.log(obj.name)
// console.log(obj.userInfo.age)

// var Obj = function () {
//     return {
//         name: 'wdq',
//         userInfo: {
//             age: 12
//         }
//     }
// }
// Obj.prototype.sex = '男' // return时无法添加原型属性？
// var person = new Obj()
// for (let field in person) {
//     console.log(field)
// }
// console.log('sex' in person)


// var Person = function (name) {
//     this.name = name;
// }
//
// //02 设置构造函数的原型对象的属性
// Person.prototype.sayHello = '男'
//
// //03 创建对象
// var p1 = new Person();
//
// //04 使用in关键字判断对象中是否存在以下属性:name age sayHello
// console.log("age" in p1);       //false
// console.log("name" in p1);      //true
// console.log("sayHello" in p1);  //true


// var fn = function () {
//     this.a = 2
// }
// var obj = {
//     a: 1
// }
// obj.b = 'ww'
// obj.p = fn
// obj.p()
// var obj1 = Object.create(obj)
// // obj1.__proto__.a = 3
// console.log(obj.a)

// var arr = [1, 2]
// var fn = function() {}
// var num = new Number(6)
// var str = new String("")
// console.log(Object.getPrototypeOf(arr) === Object.prototype) // 到用instanceOf测原型链
// console.log(Object.getPrototypeOf(fn) === Function.prototype)
// console.log(Object instanceof constructor )
// var obj = {}
// var objCopy = Object.create(null)
// console.log(obj.prototype)
// console.log(obj instanceof Object)
// console.log(objCopy instanceof Object)
// console.log({name: 'wdq'} instanceof Object)

// 构造函数
// function Person() {
//
// }
// function User() {
//
// }
// Person.prototype = new User()
// console.log(person)

// 子对象也是object时，this的指向是.后面的子对象
// var obj = {
//     name: 'wdq',
//     userInfo: {
//         age: 16
//     }
// }
//
// obj.userInfo.sex = function () {
//     return this.age
// }
// console.log(obj.userInfo.sex())

// function Father(){
//     this.property = true;
// }
// Father.prototype.getFatherValue = function(){
//     return this.property;
// }
// function Son(){
//     this.sonProperty = false;
// }
// //继承 Father
// Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
// Son.prototype.getSonVaule = function(){
//     return this.sonProperty;
// }
// console.log(Son.prototype.getSonVaule())
// var instance = new Son();
// console.log(instance.getFatherValue());//true

// var oldMap = undefined
// var map = oldMap || {name: 1}
// console.log(map)

// js new
var name = 'wdq'
function Person(name) {
    this.name = name
}
var user = new Person(name)

// var name = 'wdq'
// function Person(name) {
//     this.name = name
// }
// var user = {} // 创建一个user的对象
// user.__proto__ = Person.prototype // 把Person.prototype赋给user的__proto__
// Person.call(user, name) // this指向user
// console.log(user)