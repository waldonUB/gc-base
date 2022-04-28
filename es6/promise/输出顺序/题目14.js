console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
  return Promise.resolve().then(() => {
    console.log('async2 end1')
  })
  // return Promise.resolve()
}
async1()

setTimeout(function () {
  console.log('setTimeout')
}, 0)

new Promise((resolve) => {
  console.log('Promise')
  resolve()
})
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })

console.log('script end')

// 目前推测是return Promise.resolve(1) 等价于  return Promise.resolve().then(() => 1)
// 并且是延迟两个tick执行

// const promise1 = new Promise((resolve) => {
//   resolve(
//     Promise.resolve().then(() => {
//       console.log(5)
//       return 6
//     }),
//   )
// }).then((res) => {
//   console.log(res)
//   console.log('promise1')
// })
// Promise.resolve()
//   .then(() => {
//     console.log(111)
//   })
//   .then(() => {
//     console.log(222)
//   })
//   .then(() => {
//     console.log(333)
//   })
