var promise = new Promise(function (resolve, reject) {
  if (1) {
    resolve(1)
    console.log(`我是resolve后的`)
  } else {
    reject(0)
  }
})

promise
  .then(
    function (result) {
      console.log(result)
      return 2
    },
    function () {}
  )
  .then(function (result) {
    console.log(result)
  })
  .catch(function (result) {})
