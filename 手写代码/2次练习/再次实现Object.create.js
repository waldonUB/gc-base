const MyCreate = function (target) {
  const obj = {}
  obj.__proto__ = target
  return obj
}

const MyNew = function (Fn, ...args) {
  const obj = {}
  obj.__proto__ = Fn.prototype
  Fn.apply(obj, args)
}

const obj = {
  a: 1,
}

const extendObj = MyCreate(obj)
console.log(extendObj)
console.log(extendObj.a)

const Person = function (name) {
  this.name = name
}
Person.prototype.getName = function () {
  return this.name
}

const person = new Person('waldon')
const person1 = Object.create(Person.prototype)

console.log(person.__proto__)
console.log(person1.__proto__)
console.log(person.__proto__ === person1.__proto__)
