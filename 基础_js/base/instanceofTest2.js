var instanceofTest = function (instance, constructor) {
  var prototype
  var proto
  if (typeof constructor !== 'function') {
    throw new Error('this object is not a constructor')
  }
  prototype = constructor.prototype
  proto = instance.__proto__
  while (true) {
    if (prototype === proto) {
      return true
    }
    if (proto === null) {
      return false
    }
    proto = proto.__proto__
  }
}

var Person = function () {}
var User = function () {}
User.prototype = new Person()
var person = new Person()
var user = new User()
console.log(person instanceof Person)
console.log(user instanceof Person)
console.log(instanceofTest(person, Person))
console.log(instanceofTest(user, User))
console.log(instanceofTest(user, Person))
console.log(instanceofTest(person, Object))
console.log(instanceofTest(person, User))
