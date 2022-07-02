const obj = {
  a: 1,
}
const obj1 = Object.create(obj)
console.log(obj1.__proto__ === obj.__proto__)
