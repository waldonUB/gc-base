const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(100)
  }, 100)
})

promise
  .then(
    () => {},
    (err) => {
      console.log('err', err)
    },
  )
  .catch((err) => {
    console.log('catch err', err)
  })
