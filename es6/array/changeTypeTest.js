function f() {
  let arr = [...arguments]
  let arr1 = Array.from(arguments)
  let type = Object.prototype.toString.call(arr).slice(8, -1)
  arr1.forEach(item => {
    console.log(item)
  })
  console.log(type)
}
f(1, 2, 3)
