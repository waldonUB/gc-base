const obj = {
  a: 1,
  b: {
    c: () => {
      return this.a
    },
    d: function () {
      return this.a
    },
  },
}
console.log(obj.b.c())
console.log(obj.b.d())

/*
箭头函数局限性：
1. 没有arguments。如果要获取参数可以使用rest的方式。也就是...args
2. 不能用call、apply这种进行显示绑定

不建议使用的场景：
1. 一般不建议在对象的属性中使用
2. 不建议在原型上使用
3. 不建议在构造函数中使用

*/
