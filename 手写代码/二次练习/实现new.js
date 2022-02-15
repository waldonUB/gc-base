const MyNew = function (Fn, ...args) {
  const _instance = Object.create(Fn.prototype)
  const res = Fn.apply(_instance, args)
  if (typeof res === 'object') {
    return res
  }
  return _instance
}

const Person = function (name, age) {
  this.name = '1' + name
  this.age = '2' + age
}

Person.prototype.getName = function () {
  return this.name
}

// const person = MyNew(Person, 'waldon', 18)
// console.log(person.getName())

const person2 = new Person('kk', 20)
console.log(person2.__proto__)
console.log(person2.__proto__ === Person.prototype)

// todo waldon Object.create的指向再看看
