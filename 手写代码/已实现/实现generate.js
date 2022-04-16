// 代码过于庞大，这个只是不完全的实现，懂核心原理即可

class Context {
  constructor() {
    this.next = 0
    this.prev = 0
    this.done = false
  }
  top() {
    this.done = true
  }
}
function gen$(context) {
  return function () {
    while (1) {
      switch ((context.pre = context.next)) {
        case 0:
          context.next = 2
          return 'result1'

        case 2:
          setTimeout(() => {
            context.next = 4
          })
          return 'result2'

        case 4:
          context.next = 6
          return 'result3'

        case 6:
          return undefined
      }
    }
  }
}
let foo = function () {
  var context = new Context()
  return {
    next: function () {
      value = gen$(context)
      done = context.done
      return {
        value,
        done,
      }
    },
  }
}
const instance = foo()
console.log(instance.next().value())
console.log(instance.next().value())
console.log(instance.next().value())
console.log(instance.next().value())

let collection = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function* () {
    // 将生成器赋值给对象的Symbol.iterator属性来创建默认的迭代器
    for (let item of Object.keys(this)) {
      yield [item, this[item]]
    }
  },
}
console.log(collection[Symbol.iterator])
for (const item of collection) {
  console.log(item)
}
