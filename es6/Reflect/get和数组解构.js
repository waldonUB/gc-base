const paramArr = [
  {
    a: 1
  },
  'a'
]
console.log(`reflect`, Reflect.get(...paramArr))

function testFn(a, b) {
  console.log(`和为：`, a + b)
}
const paramsArr = [1, 2]
testFn(...paramsArr)
