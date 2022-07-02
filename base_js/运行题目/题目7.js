var a = {}
Object.defineProperty(a, 'name', {
  writable: false,
  value: 'a'
})

var b = Object.create(a)
b.name = 'b'
console.log(b.name)

// 输出a，原型链上的属性设置了不可写
