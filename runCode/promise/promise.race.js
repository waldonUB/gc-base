Promise.myRace = function (arr) {
  return new Promise((resolve, reject) => {
    for (const item of arr) {
      item
        .then((res) => {
          resolve(res)
          return
        })
        .catch((err) => {
          reject(err)
          return
        })
    }
  })
}
