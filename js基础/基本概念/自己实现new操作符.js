// todo waldon 有点问题，后续再找健全的方案
function myNew(Fn, ...args) {
  let obj = Object.create(Fn)
  obj.__proto__ = Fn.prototype
  return obj
}

// class User {
//   constructor(name) {
//     this.userName = name
//   }
//   static getUserName() {
//     console.log(`static getUserName：`, this.userName)
//   }
//   getSelfUserName() {
//     console.log(`self getUserName：`, this.userName)
//   }
// }

function User(name) {
  this.userName = name
}
User.prototype.getUserName = function () {
  console.log(`getUserName 执行`, this.userName)
}

const user1 = myNew(User, 'wdq')
user1.getUserName()
