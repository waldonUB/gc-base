function* foo() {
  console.log(`调度`)
  const a = yield 'hello' // 这里默认是undefined，除非在next()里面传入参
  console.log(`hello`, a)
  yield 'world'
  console.log(`world`)
}
const generator = foo()
generator.next()
generator.next()
generator.next()
generator.next()
