function f() {
  console.log(arguments)
  console.log(arguments instanceof Array) // false
  const list = Array.prototype.slice.call(arguments)
  console.log(list instanceof Array) // true
  debugger
}
f(66, 55)
