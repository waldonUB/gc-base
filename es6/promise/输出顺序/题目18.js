new Promise((resolve, reject) => {
  Promise.resolve()
    .then(() => {
      console.log(1)
    })
    .then(() => {
      console.log(2)
    })
  resolve()
})
  .then(() => {
    console.log(3)
    Promise.resolve()
      .then(() => {
        console.log(4)
      })
      .then(() => {
        console.log(5)
      })
  })
  .then(() => {
    console.log(6)
  })
/*
1
3
2
4
6
5
*/
