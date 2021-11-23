function* foo() {
  console.log(`调度`)
  const a = yield 'hello'
  console.log(`hello`, a)
  yield 'world'
  console.log(`world`)
}
const generator = foo()
generator.next()
generator.next()
generator.next()
generator.next()
