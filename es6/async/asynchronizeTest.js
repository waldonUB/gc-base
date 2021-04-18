// async返回的是一个promise对象
async function f() {
  console.log(2)
  const time = await 'await'
  console.log(time)
  return 666
}
const promise = f()
promise.then(function (res) {
  console.log(res)
})
console.log(1)
// 执行结果 2 1 await  666
