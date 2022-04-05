const fn = function* () {
  const a = yield
  console.log(a)
}

const fnInstance = fn()

console.log(fnInstance.next())
console.log(fnInstance.next())
