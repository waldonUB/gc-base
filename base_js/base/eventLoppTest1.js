setTimeout(() => {
  console.log(1)
}, 0)
let a = new Promise((resolve) => {
  console.log(2)
  resolve()
})
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
console.log(5)

// 2 5 3 4 1
