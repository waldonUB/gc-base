Function.prototype.myCall = function (source) {
  console.log(`第一层参数：`, [...arguments])
  const paramsArr = [...arguments].filter((item, index) => index !== 0)
  source.fn = this
  source.fn(...paramsArr)
  delete source.fn
}
const obj = {
  a: 2
}
const foo = function (name, age) {
  console.log(`名字：${name}, 年龄：${age}`)
  console.log(this.a)
}

// 测试
const params = {
  name: 'waldon',
  age: 18
}
foo.myCall(obj, params.name, params.age)
