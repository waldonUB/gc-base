Promise.myAny = function (arr) {
  return new Promise((resolve, reject) => {
    let count = 0
    for (const item of arr) {
      item
        .then((res) => {
          count++
          resolve(res)
          return
        })
        .catch((err) => {
          count++
          if (count === arr.length) {
            reject('all resolve not fulfilled')
          }
        })
    }
  })
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(1)
    reject(4)
  }, 4)
})
const promise2 = Promise.reject(2)

Promise.any([promise1, promise2])
  .then((res) => {
    console.log('then', res)
  })
  .catch((err) => {
    console.log('catch', err)
  })
