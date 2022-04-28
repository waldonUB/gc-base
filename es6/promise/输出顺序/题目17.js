setTimeout(() => {
  console.log('0')
}, 0)
new Promise((resolve, reject) => {
  console.log('1')
  resolve()
})
  .then(() => {
    console.log('2')
    new Promise((resolve, reject) => {
      console.log('3')
      resolve()
    })
      .then(() => {
        console.log('4')
      })
      .then(() => {
        console.log('5')
      })
  })
  .then(() => {
    console.log('6')
  })

new Promise((resolve, reject) => {
  console.log('7')
  resolve()
}).then(() => {
  console.log('8')
})

// 连续.then不是多个微任务添加的，而是先执行完里面的代码
