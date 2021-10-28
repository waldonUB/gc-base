const fn = async function () {
  console.log(1)
  // await fn3()
  await fn2()
}
const fn2 = async function () {
  console.log(3)
}
const fn3 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
fn()
console.log(2)
