function f() {
  let arr = [1,2,3,4,5]
  for (let item of arr) {
    console.log(item)
    if (item === 1) {
      break
    }
  }
}
console.log(`当前结果为：` + f())
