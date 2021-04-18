let a = new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 3000)
})
Promise.all([a.then(res => {
  return 1
})]).then(res => {
  console.log(`res`, res)
  console.log(`aaaa`)
})