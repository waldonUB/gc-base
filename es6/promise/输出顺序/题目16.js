async function testSomething() {
  console.log('testSomething')
  return 'return testSomething'
}

async function testAsync() {
  console.log('testAsync')
  return Promise.resolve('hello async')
}

async function test() {
  console.log('test start...')

  const testFn1 = await testSomething()
  console.log(testFn1)

  const testFn2 = await testAsync()
  console.log(testFn2)

  console.log('test end...')
}

test()

var promiseFn = new Promise((resolve) => {
  console.log('promise START...')
  resolve('promise RESOLVE')
})
promiseFn.then((val) => console.log(val))

console.log('===END===')

/*
test start...
testSomething
promise START...
===END===
return testSomething
testAsync
promise RESOLVE
hello async
test end...
*/
