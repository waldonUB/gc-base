const obj = {
  a: 1,
}
const fn = () => {
  return obj
}
console.log(fn() === fn()) // true

const fn1 = () => {
  return Promise.resolve(obj)
}
console.log(fn1() === fn1()) // false
