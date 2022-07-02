var age = 10
var obj1 = {
  age: 11
}
const obj = {
  age: 16,
  fn: () => {
    console.log(`age: `, this.age) // 浏览器输出10，指向父级的
  },
  foo: function () {
    return () => {
      console.log(`age: `, this.age)
    }
  }
}
obj.fn()
obj.foo().call(obj1)
// 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this 来自mdn

// 不会被隐式绑定和显示绑定改变

// 由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this---译者注），他们的第一个参数会被忽略
