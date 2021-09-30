const promise = new Promise((resolve, reject) => {
  const a = -1
  setTimeout(() => {
    if (a > 0) {
      resolve(a) // 这个值会在.then中返回
    } else {
      reject('当前值无效')
    }
  }, 500)
})
promise
  .then((res) => {
    console.log(`第一次then`, res)
    return res + 1
  })
  .catch((err) => {
    console.log(`第一次catch`, err)
    return err + 10
  })
  .then((subRes) => {
    console.log(`第二次then`, subRes)
  })
