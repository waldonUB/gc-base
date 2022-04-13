Promise.resolve().then(() => {
  console.time()
  let i = 0
  while (i < 10000000000) {
    const arr = new Array(10)
    i++
  }
  console.timeEnd()
})
Promise.resolve().then(() => {
  console.time()
  let i = 0
  while (i < 10000000000) {
    const arr = new Array(10)
    i++
  }
  console.timeEnd()
  console.log('第二个微任务')
})
