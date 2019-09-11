function f() {
  let arr = []
  let fArr = null
  console.log(Object.prototype.toString.call(arr).slice(8, -1) === 'Array')
  console.log(Array.isArray(arr))
  console.log(arr instanceof Array)
  console.log(Array.isArray(fArr))
  console.log(fArr instanceof Array)
}
f()
