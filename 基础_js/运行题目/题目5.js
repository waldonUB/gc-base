// setTimeout(function () {
//   console.log(1)
// }, 0)
// new Promise(function executor(resolve) {
//   console.log(2)
//   for (var i = 0; i < 10000; i++) {
//     i == 9999 && resolve()
//   }
//   console.log(3)
// }).then(function () {
//   console.log(4)
// })
// console.log(5)

// 2 3 5 4 1

var output = function (i) {
  setTimeout(function () {
    console.log(i)
  }, 1000)
}

for (var i = 0; i < 5; i++) {
  output(i) // 这里传过去的 i 值被复制了
}
