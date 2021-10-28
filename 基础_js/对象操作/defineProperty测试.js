const obj = {
  a: 1,
  b: 2
}
Object.defineProperty(obj, 'a', {
  enumerable: false
})

for (item in obj) {
  // 仅输出b
  console.log(item)
}
