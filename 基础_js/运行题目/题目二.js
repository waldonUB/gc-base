var i = 0
function fun() {
  i++
  if (i <= 10) {
    fun()
  } else {
    console.log(`这里`)
    return i
  }
}
console.log(fun()) // 回调函数最外层没有return，输出undefined

// var i = 0
// function fun() {
//   i++
//   if (i <= 1) {
//     function fun1() {
//       i++
//       if (i <= 1) {
//         console.log(`fun1的if`)
//       } else {
//         console.log(`这里`)
//         return i
//       }
//     }
//     return fun1()
//   } else {
//     console.log(`这里`)
//     return i
//   }
// }
// console.log(fun())
