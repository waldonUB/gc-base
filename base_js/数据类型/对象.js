const fn = () => {
  return ''
}
const obj = {}
const arr = []
// fn非数据结构，尽管 typeof 操作的结果是：typeof instance === "function"
// 尽管每个 Function 构造器都由 Object 构造器派生
console.log(fn instanceof Object) // 结果是true
console.log(obj instanceof Object) // obj是对象
console.log(arr instanceof Object) // arr是对象

const symbol = Symbol()
console.log(typeof symbol)
