setTimeout(() => {
  console.log(1)
  Promise.resolve().then(() => {
    console.log(24)
  })
})
setTimeout(() => {
  console.log(3)
})
