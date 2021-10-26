const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 400)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})

console.log(`sss`)
Promise.all([promise1, promise2]).then((res) => {
  console.log(`all res`, res)
})

Promise.allSettled([promise1, promise2]).then((res) => {
  console.log(`allSettled res`, res)
})
