// 通用的有两种，typeof 和 toString
const str = '字符串'
console.log(typeof str)
console.log(Object.prototype.toString.call(str))
console.log(str instanceof String) // 不正确的用法，instanceof只能判断一个对象是否为另一个对象的实例
