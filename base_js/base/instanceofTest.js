var instanceofTest = function (instance, object) {
  var prototype
  var proto
  // if (typeof instance !== 'object') { 不需要，左边是什么类型都可以，但是一般为实例才会做判断
  //     throw new Error("this instance is not a object")
  // }
  if (typeof object !== 'function') {
    throw new Error('this object is not a constructor')
  }
  prototype = object.prototype
  proto = instance.__proto__
  if (proto === prototype) {
    return true
  }
  while (proto.__proto__ !== null) {
    if (proto.__proto__ === prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
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
