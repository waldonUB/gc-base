/**
 * 按部就班版的new
 * 1. 创建一个新对象
 * 2. 将新对象的原型设置为构造函数的 prototype 属性
 * 3. 执行构造函数，将 this 指向该原型对象
 * 4. 返回这个新对象
 * @author waldon
 * @date 2022-02-15
 * @param {*} param - param
 * @param {*} param - param
 */
const MyNew_1 = function (Fn, ...args) {
  const obj = {}
  obj.__proto__ = Fn.prototype // 优化：Object.setPrototypeOf(obj, Fn.prototype)
  const res = Fn.apply(obj, args)
  // 优化：type：function && res !== null
  if (typeof res === 'object') {
    return res
  }
  return obj
}

function newOperator(ctor) {
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  // ES6 new.target 是指向构造函数
  newOperator.target = ctor
  // 1.创建一个全新的对象，
  // 2.并且执行[[Prototype]]链接
  // 4.通过`new`创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
  var newObj = Object.create(ctor.prototype)
  // ES5 arguments转成数组 当然也可以用ES6 [...arguments], Aarry.from(arguments);
  // 除去ctor构造函数的其余参数
  var argsArr = [].slice.call(arguments, 1)
  // 3.生成的新对象会绑定到函数调用的`this`。
  // 获取到ctor函数返回结果
  var ctorReturnResult = ctor.apply(newObj, argsArr)
  // 小结4 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  var isFunction = typeof ctorReturnResult === 'function'
  if (isObject || isFunction) {
    return ctorReturnResult
  }
  // 5.如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj
}

const Foo = function () {
  this.c = 3
  // return {
  //   a: 1,
  // }
}
Foo.prototype.b = 2

// const foo1 = new Foo()
// console.log(`foo1`, foo1)
// console.log(`foo1.b`, foo1.b)
// console.log(`foo1.c`, foo1.c)

// const foo3 = newOperator(Foo)
// console.log(`foo3`, foo3)
