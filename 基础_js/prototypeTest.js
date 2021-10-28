function Person(name, age) {
  this.name = name
  this.sayName = function () {
    console.log(name)
  }
  this.obj = {
    name: name
  }
  this.arr = []
}

function person(name, age) {
  this.name = name
}
var person1 = new Person('wdq')
var person2 = new Person('wdq')
var person3 = person('wdq')
console.log(person1.name)
person1.name = '666'
console.log(person1.name) // 构造器，不是同一个实例，不会更改
console.log(person2.name)
console.log(person1.name === person2.name) // filed
console.log(person1.sayName === person2.sayName) // function
console.log(person1.obj === person2.obj) // object
console.log(person1.arr === person2.arr) // array
person1.arr.push(666)

// 原型模式
function User() {}
User.prototype = {
  name: 'w',
  sayName: function () {},
  obj: {},
  arr: []
}

var user1 = new User()
var user2 = new User()
console.log(user1.name)
user1.name = 'q' // 指针指向的不一样，无法添加到原型
console.log(user1.name)
console.log(user2.name)
user1.arr.push(666) // 直接添加到原型中
user1.obj.age = 16 // 直接添加到原型中
user1.obj = {} // 指针指向的不一样，无法添加到原型
user1.sayName = function () {
  console.log(666)
} // 指针指向的不一样，无法添加到原型
console.log(user1.sayName === user2.sayName)
console.log(user1.obj === user2.obj)
