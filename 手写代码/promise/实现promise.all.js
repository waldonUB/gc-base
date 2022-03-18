Promise.myAll = function (arr) {
  return new Promise((resolve, reject) => {
    let _res = new Array(arr.length)
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      item
        .then((res) => {
          _res[i] = res
          count++
          if (count === arr.length) {
            resolve(_res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4)
  }, 0)
})

const promise1 = Promise.all([p1, Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
  .then((res) => {
    console.log('res', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
