// function test() {
//     let arr = []
//     let str = '12345'
//     let type = Object.prototype.toString.call(arr).slice(8, -1)
//     console.log(type)
//     console.log(str.slice())
// }
// test()

function test1() {
  let arr = []
  console.log(arr instanceof Array)
  console.log(Array.isArray(arr))

}
test1()
