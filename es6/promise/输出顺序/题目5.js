var p1 = new Promise((resolve) => {
  console.log(1)
  setTimeout(() => {
    resolve(2)
  }, 5000)
})
var p2 = new Promise((resolve) => {
  console.log(3)
  resolve(p1)
})
p1.then((re) => {
  console.log('p1: ', +re)
})
p2.then((re) => {
  console.log(re)
})
// 失手一次 2022年6月15日
