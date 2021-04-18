function promiseTest(type) {
  if (type) {
    return
  }
  return new Promise((resolve) => {})
}
promiseTest(0).then((res) => {
  console.log(`res`, res)
})
