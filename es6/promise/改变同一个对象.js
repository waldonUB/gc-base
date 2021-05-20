const promise = new Promise((resolve) => {
  let arr = [1]
  console.log(`执行promise`, arr)
  setTimeout(() => {
    resolve(arr)
  }, 3000)
})
promise.then((res) => {
  console.log(`第一次`, res)
  res.push(2) // 会影响上一次的结果
})
promise.then((res) => {
  console.log(`第二次`, res)
})
