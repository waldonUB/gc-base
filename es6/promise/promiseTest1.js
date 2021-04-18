var promise = new Promise(function (resolve, reject) {
  var a = 0
  if (a) {
    resolve(1)
  } else {
    reject(2)
  }
})
promise
  .then(
    function (res) {
      console.log(res)
    },
    function (res) {
      console.log(res)
    }
  )
  .then(
    function () {},
    function () {}
  )
