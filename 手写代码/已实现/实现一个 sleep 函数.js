// 比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现
// 解析：[第 42 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/63)

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

sleep(1000).then(() => {
  console.log(2)
})
;(async function () {
  await sleep(1000)
  console.log(1)
})()

function* sleepGenerator(delay) {
  yield new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}
