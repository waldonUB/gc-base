function Foo() {
  return 1
}

function Bar() {
  return {
    a: 1
  }
}
const foo = new Foo()
const bar = new Bar()

console.log(`foo`, foo) // 返回值为非对象时，默认返回空对象
console.log(`bar`, bar)
