Promise.myAllSettled = function (arr) {
  return new Promise((resolve, reject) => {
    let _res = new Array(arr.length)
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      item
        .then((res) => {
          count++
          _res[i] = {
            value: res,
            status: 'fulfilled',
          }
          if (count === arr.length) {
            resolve(_res)
          }
        })
        .catch((err) => {
          count++
          _res[i] = {
            reason: err,
            status: 'rejected',
          }
          if (count === arr.length) {
            resolve(_res)
          }
        })
    }
  })
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4)
  }, 0)
})

const promise1 = Promise.myAllSettled([
  p1,
  Promise.resolve(1),
  Promise.reject(2),
  Promise.resolve(3),
])
  .then((res) => {
    console.log('res', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
