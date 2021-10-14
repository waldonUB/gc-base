var promise = new Promise(function (resolve, reject) {
  if (1) {
    resolve(1)
    console.log(`我是resolve后的`)
  } else {
    reject(0)
  }
})

setTimeout(() => {
  promise.then((res) => {
    console.log(`then`, res)
  })
}, 500)
