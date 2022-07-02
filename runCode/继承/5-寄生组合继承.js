function Father(name) {
  this.name = name
}

function Son(name, age) {
  Father.call(this, name) // 1. 调用父级函数（借用构造函数继承） 其实就是把赋值的结果转移到this上了
  this.age = age
}

Son.prototype = Object.create(Father.prototype) // 2. 原型继承
Son.prototype.constructor = Son // 3. 重写构造函数

// 4. 只是一个寄生的扩展，可以不放在主要步骤里面
Son.prototype.getAge = function () {
  return this.age
}
