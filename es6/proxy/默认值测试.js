const target = {
  a: 1,
  b: 2
}
const handler = {
  get(target, prop) {
    // console.log(`target`, target) // 被调用的对象
    // console.log(`prop`, prop) // 这个是被调用的属性
    if (prop in target) {
      return Reflect.get(...arguments)
    } else {
      return '我是默认值'
    }
  }
}
const proxy = new Proxy(target, handler)
console.log(`proxy`, proxy.a) // 输出1
console.log(`proxy`, proxy.c) // 输出 "默认值"
Object.assign(target, { c: 3 })
console.log(`proxy`, proxy.c) // 输出 "默认值"
