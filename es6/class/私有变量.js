class User {
  userName = 'waldon'
  getName() {
    return userName // not defined
  }
}

const user1 = new User()
console.log(user1.getName())
