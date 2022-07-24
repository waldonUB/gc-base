const promise = new Promise((resolve, reject) => {
  if (false) {
    resolve()
  } else {
    reject('err')
  }
})

const get = function () {
  return promise.catch((err) => {
    // console.log(err)
    throw new Error(err)
  })
}

console.log(get().catch((res) => console.log(res)))
