function assignTest() {
  const args = Array.prototype.slice.call(arguments)
  for (let i = 0; i < args.length; i++) {
    // if (i === 0) {
    //   obj = Object.create(args[i])
    // }
    for (let item in args[i]) {
      if (args[i].hasOwnProperty(item)) {
        args[0][item] = args[i][item]
      }
    }
  }
}
let obj1 = {
  a: 1
}
let obj2 = {
  a: 3,
  b: 2
}

console.log(assignTest(obj1, obj2))
console.log(obj1)
