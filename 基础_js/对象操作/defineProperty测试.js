const obj = {
  a: 1,
  b: 2,
}

const arr = [1, 2]

Object.defineProperty(obj, 'a', {
  enumerable: false,
})

Object.defineProperty(arr, 1, {
  enumerable: false,
  get() {
    return 5
  },
})

for (item in obj) {
  // 仅输出b
  console.log(item)
}

for (item in arr) {
  // 仅输出b
  console.log(item)
}
