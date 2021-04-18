const obj = {
  a: 1,
  b: 2
}
const c = 3
const d = 4


function showObject() {
  console.log(this.a)
  console.log(arguments)
}

showObject.call(obj, c, d)
showObject.apply(obj, [c, d])
