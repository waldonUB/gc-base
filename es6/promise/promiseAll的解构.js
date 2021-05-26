const promiseA = Promise.resolve(5)
const promiseB = Promise.resolve(6)
Promise.all([promiseA, promiseB]).then(([a, b]) => {
  console.log(`a`, a)
  console.log(`b`, b)
})
