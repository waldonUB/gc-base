Promise.myAllSettled = async function (callbacks) {
  return new Promise((resolve, reject) => {
    const results = []
    for (const item of callbacks) {
      item
        .then((res) => {
          results.push({
            name: 'waldon',
            status: 'fulfilled',
            value: res
          })
          if (results.length >= callbacks.length) {
            resolve(results)
          }
        })
        .catch((err) => {
          results.push({
            name: 'waldon',
            status: 'rejected',
            reason: err
          })
          if (results.length >= callbacks.length) {
            resolve(results)
          }
        })
    }
  })
}

const promise1 = Promise.resolve(5)
const promise2 = Promise.reject(0)
Promise.myAllSettled([promise1, promise2]).then((res) => {
  console.log(res)
})
Promise.allSettled([promise1, promise2]).then((res) => {
  console.log(res)
})
