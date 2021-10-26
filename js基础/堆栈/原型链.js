const MyFn = (name) => {
  return {
    name
  }
}
MyFn.prototype.age = 18

const myFn1 = new MyFn('waldon')

console.log(myFn1.age)
