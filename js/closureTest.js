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
// var name = 'wdq'
// function Person(name) {
//     this.name = name
// }
// var user = new Person(name)

// var name = 'wdq'
// function Person(name) {
//     this.name = name
// }
// var user = {} // 创建一个user的对象
// user.__proto__ = Person.prototype // 把Person.prototype赋给(因为是引用类型，所以应该是指向)user的__proto__
// Person.call(user, name) // this指向user
// console.log(user)

// function NewTest() {
//     return {}
// }
// var x = new NewTest()
// var y = new String(1)
// console.log(y)

// var arr = []
// var num = 2
// var obj = {}
// var fn = function() {}
// console.log(arr instanceof Object)
// console.log(num instanceof Object) // false
// console.log(obj instanceof Array)
// console.log(fn instanceof Function) // true
// console.log(fn instanceof Object) // true

// function Person() {
//     this.setName = function (newName) {
//         var name = newName;
//         console.log(name)
//     }
// }
//
// var p1 = new Person()
// var p2 = new Person()
// p1.setName('wdq')
// p2.setName('ksl')

// 工厂模式
// function createPerson(name, age) {
//     var person = new Object(6); // 显式地创建
//     person.name = name
//     person.age = age
//     return person
// }
//
// var wdq = createPerson('wdq', 23)

// 单体模式
// var Singleton = function (name) {
//     this.name = name
//     // this.instance = null // 其实是全局变量，放在里面就是为了在创建的时候才用到，不浪费空间？
// }
// function getInstance(name) {
//     if (!this.instance) {
//         this.instance = new Singleton(name)
//     }
//     return this.instance
// }
// var person1 = getInstance('wdq')
// console.log(person1.name)
// var person2 = getInstance('ksl')
// console.log(person2.name)

// 闭包函数的单体？
// var Singleton = function (name) {
//     this.name = name
// }
//
// var getInstance = (function () {
//     var instance = null;
//     return function (name) {
//         instance = instance || new Singleton(name)
//         return instance
//     }
// })()
//
// var person1 = getInstance('wdq')
// var person2 = getInstance('ksl')

// 创建一个弹窗div
// var Dialog = (function () {
//     var div = null
//     return function (html) {
//         if (!div) {
//             div = document.createElement('div')
//         }
//         div.innerHTML = html // 这里可以随便改html文字
//         return div
//     }
// })()
//
// var success = new Dialog('<p>success</p>')
// var error = new Dialog('<p>error</p>')
// console.log(success === error) // true

// 闭包二次测试
// var closeTest = (function () {
//     var name = 'wdq'
//     function showAge (age) {
//         console.log(name, age)
//     }
//     name = 'ksl'
//     return showAge
// })()
// var p1 = closeTest(12) // 是引用了内部变量，而不是拷贝

// var closeTest = function () {
//     var name = 'wdq'
//     function f() {
//         console.log(name)
//     }
//     name = 'ksl'
//     return f
// }
//
// var p1 = closeTest()
// p1()

// var createPerson = function (newName, newAge) {
//     var name = newName
//     var age = newAge
//     return {
//        getName: function () {
//            console.log(name)
//        },
//        setName: function (setName) {
//            name = setName
//        }
//     }
// }
//
// var wdq = createPerson('wdq', 23)
// var ksl = createPerson('ksl', 22)
// wdq.getName()
// ksl.getName()
// wdq.setName('waldon')
// wdq.getName()

// 工厂模式再测试
// function f(name) {
//     var obj = {}
//     obj.name = name
//     return obj
// }
// var p1 = f('wdq')
// var p2 = f('ksl')

// for (var i = 0; i < 5; i++) { // 5
//     setTimeout(function () {
//         console.log(i)
//     }, 0)
// }

// for (var i = 0; i < 5; i++) { // 01234
//     (function (i) {
//         setTimeout(function () {
//             console.log(i)
//         }, 0)
//     })(i)
// }

// for (var i = 0; i < 5; i++) { // 01234  其实function的立即执行函数之后返回的就是function了
//     setTimeout((function (i) {
//         return function () {
//             console.log(i)
//         }
//     })(i), 0)
// }

// function f() {
//     var num = 5
//     function f1() {
//         console.log(num)
//     }
//     num = 4 // 这里也是值的拷贝，只是赋值顺序不一样
//     return f1
// }
// var f = f()
// f()
// var obj = {
//     num: 0
// }
// for (var i = 0; i < 5; i++) { // 传入参数为引用类型时，使用堆引用?
//     obj.num = i
//     setTimeout((function (obj) {
//         return function () {
//            console.log(obj.num)
//         }
//     })(obj), 0)
// }

// var num = 0
// for (var i = 0; i < 5; i++) { // 保留了创建闭包函数时的环境，比如说变量
//     num = i
//     setTimeout((function (num) {
//         return function () {
//            console.log(num)
//         }
//     })(num), 0)
// }

// var arr = []
// for (var i = 0; i < 5; i++) {
//     var obj = {
//         num: i
//     }
//     setTimeout((function (obj) {
//         return function () {
//            console.log(obj.num)
//            arr.push(obj)
//         }
//     })(obj), 0)
// }
// setTimeout(function () {
//     console.log(arr[0] === arr[1]) // 不是同一个对象
// }, 300)

// function f(callback1, callback2) {
//     var num = 0 // 这个num在函数调用完之后会被销毁
//     console.log(num)
//     getNum1 = function () {
//         console.log(num)
//         num++
//     }
//
//     getNum2 = function () {
//         console.log(num)
//     }
// }
//
// var fn = f()
// getNum1()
// getNum2()
// f() // 已经不是闭包绑定的那个num了

// var fn = (function () {
//     var num = 0
//     function changeNum(val) {
//         num += val
//     }
//     return {
//         getNum1: function () { // 这三个函数都是绑定了num作为词法环境，其中getNum1和getNum2绑定了changeNum函数作为词法环境
//             changeNum(1)
//             console.log(num)
//         },
//         getNum2: function () {
//             changeNum(2)
//             console.log(num)
//         }
//     }
// })()
//
// fn.getNum1() // 1
// fn.getNum2() // 3

// var fn = (function () {
//     var num = 0
//     return {
//         getNum1: function () {
//             function changeNum(val) {
//                 num += val
//             }
//             num++
//             // console.log(num)
//             return changeNum
//
//         },
//         getNum2: function () {
//             function changeNum(val) {
//                 num += val
//             }
//             // console.log(num)
//             return changeNum
//
//         }
//     }
// })()
//
// var change1 = fn.getNum1() // 1
// var change2 = fn.getNum2() // 3
// change1(1)
// change2(2)
// var change3 = fn.getNum1()
// console.log(change1 === change3) // false
// change3(1)

// 循环中创建闭包
// var arr = (function f() {
//     var arr = []
//     for (var i = 0; i < 5; i++) {
//         arr[i] = function () { // 赋值给arr[i]的是闭包
//             console.log(i)
//         }
//     }
//     return arr
// })()
// arr.forEach(function (item) {
//     item()
// })

// 构造函数
// function Person(name) {
//     this.name = name
//     this.age = 10
// }
// Person.prototype.getName = function () {
//     return this.name
// }
// function User(name) {
//     Person.call(this, name)
// }
// User.prototype = Object.create(Person.prototype)
// var user1 = new User('wdq')
// Person.prototype.sex = '男'
// User.prototype.sex = '女'
// console.log(user1.age)
// var p1  = new Person('ksl');
// p1.age = 12
// console.log(user1.age)
// console.log(p1.getName())
// console.log(user1.getName())
// console.log(user1.hasOwnProperty('sex'))
// console.log(user1.sex)
// // p1.setSex()
// console.log(user1.sex)

function Person() {
    this.name = 'wdq'
}
function User() {
    Person.call(this)
}
User.prototype = new Person()
var user1 = new User()

