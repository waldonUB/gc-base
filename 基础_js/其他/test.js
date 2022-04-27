Promise.resolve()
  .then(() => {
    if (1 + 1 === 2) {
      console.log('1 + 1')
      return 3
    }
    return 1
  })
  .finally(() => {
    console.log('final')
    return
  })
  .then((res) => {
    console.log(res)
  })
