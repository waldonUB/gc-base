interface User {
  name: string
  age?: number
}

function getUserInfo(user: User): void {
  console.log(user)
}
