var person = (function () {
  var obj = {}
  return function (name, age) {
    if (Object.keys(obj).length === 0) {
      obj.name = name
      obj.age = age
    }
    return obj
  }
})()

var user1 = person('wdq', 19)
var user2 = person('ksl', 18)
console.log(user1)
console.log(user2)
