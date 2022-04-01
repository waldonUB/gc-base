const objectEntries = function* (target) {
  const keys = Object.keys(target)

  for (const key of keys) {
    yield [key, target[key]]
  }
}

const obj = {
  name: 'waldon',
  age: 18,
}

console.log()

for (const item of objectEntries(obj)) {
  console.log(item)
}
