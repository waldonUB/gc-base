var fn1 = function (userName) {
  this.name = userName
  console.log(`name is :` + this.name)
}

var fn2 = function (userName) {
  var user = {
    name: userName
  }
  user.getName = fn1
  return user
}

var u1 = fn2('wdq')
var u2 = fn2('ksl')
u1.getName()
u2.getName()
console.log(`888`)
