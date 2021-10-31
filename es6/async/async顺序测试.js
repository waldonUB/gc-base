async function foo() {
  console.log(`foo执行`)
  await bar()
  console.log(`await 后`)
}
async function bar() {
  console.log(`bar执行`)
}
foo()
// 这里await就相当于解析一个promise，
// 其实就相当于new Promise.then，
// 里面还是同步的代码块
// 然后先执行完所有微任务再执行宏任务
console.log(`执行普通`)

// foo执行
// bar执行
// 执行普通
// await 后

const promise = new Promise((resolve) => {
  resolve()
})
setTimeout(() => {
  console.log('setTimeout')
})
promise.then(() => {
  console.log(`first promise`)
  Promise.resolve().then(() => {
    console.log(`second promise`)
  })
})
// first promise
// second promise
// setTimeout
