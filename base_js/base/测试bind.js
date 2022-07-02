var a = 2
const obj = {
  a: 1,
}

const obj2 = {
  a: 3,
}

const foo = function () {
  return this.a
}

const bar = foo.bind(null)
obj2.bar = foo.bind(obj)
console.log(bar())
console.log(obj2.bar())
