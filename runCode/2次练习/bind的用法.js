const obj = {
  z: 1,
}
const foo = function (x, y) {
  console.log(this.z + x + y)
}

const bar = foo.bind(obj, 100)
bar(5, 6)
