const promise = new Promise((resolve, reject) => {
  // console.log(1)
  // resolve(20)
  // console.log(3)
})
// promise.then((res) => {
//   console.log(res)
// })
console.log(promise.__proto__ === Promise.prototype)
console.log(Promise.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)

Object.create(null)
