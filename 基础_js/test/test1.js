// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   throw Error('我是error')
//   resolve(20)
//   console.log(3)
// })
// promise
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log('err', err)
//   })

const foo = async function () {
  try {
    Promise.reject()
      .then(
        () => {
          throw Error('wo err')
        },
        (err) => {
          console.log('second', err)
        },
      )
      .catch((err) => {
        console.log('promise', err)
      })
  } catch (err) {
    console.log('try catch', err)
  }
}
foo()
