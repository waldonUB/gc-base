- [x] promise回调，原理，es5的实现方式？ 在gc-base里面
- [x] 函数的闭包？ https://coolshell.cn/articles/6731.html <br>
MDN官方： 闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。并且这些变量在函数返回后不会被垃圾回收机制回收<br>
缺点：
- 对处理速度和内存有影响<br>
特点：
- 闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。
- 闭包就是就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配
- 当在一个函数内定义另外一个函数就会产生闭包
- 当多个函数在同一个函数内的话，会绑定同一个闭包。比如：

```
obj  = {getName: function() {}, setName: function() {}} // 第一种情况
var arr = [] // 第二种情况
arr.push(function1)
arr.push(function1)
return arr
```
- 每次调用闭包函数，都会产生新的闭包；只有在同一个闭包的函数才能绑定同一个闭包
闭包保留了创建闭包时的环境，如变量。

- [x] 那面向对象和面向过程编程有什么区别？
- 面向对象强调的是对象。具有三个特征，继承，多态和封装，做出来的东西易于扩展和维护；
- 面向过程强调的是动作，不用花费其他开销，性能比较好，但是维护性和复用性较差。

- [x] js是单线程的，怎么异步？
- 浏览器常驻线程有3个，js引擎线程，GUI渲染线程，触发事件线程，（还可能会http请求线程）
- GUI渲染线程和JS引擎线程是互斥的，当执行JS时，GUI渲染线程会放到一个队列中，等执行完JS立即执行
- 事件触发线程：setTimeout、ajax异步请求这种都是等执行完后放到队列内，如setTimeout 3000，其实是3秒后放进队列中，并不是3S后执行
https://www.jianshu.com/p/7e2437b8dc67

- [x] hasOwnProperty
- 用来判断某个对象是否含有指定的属性的 Boolean（只检查实例属性）。 所有继承了 Object 的对象都会继承到 hasOwnProperty方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性

```
var obj = {}
// 这部分在in中可以显示，在hasOwnPrototype中不显示
obj.prototype.fn = function () {} 
```
- [x] 原型链
###### 定义：原型链是一种对象的继承关系，本质是一个引用类型继承了另一个引用类型的属性和方法。从继承的最底端开始，逐层往上，一直到以Object的原型对象为顶端形成链状结构，就是原型链。

- JS正是通过__proto__和prototype(只有函数会有，相当于类的定义)的合作实现了原型链，以及对象的继承。
- js只支持单继承，也没有接口继承的概。
- 只有函数才有prototype属性，但并不是所有的函数都有prototype属性，比如：用 Function.prototype.bind 创建的函数对象（该方法会返回一个新的函数对象，用法：function.bind()）

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#%E8%AF%AD%E6%B3%95%E7%BB%93%E6%9E%84%E5%88%9B%E5%BB%BA%E7%9A%84%E5%AF%B9%E8%B1%A1 <br>
https://github.com/creeperyang/blog/issues/9
- [x] function本身和执行的结果？

```
function a () {}
var b = a // 本身
var c = a() // 执行的结果
```
- [x] 回调函数的特点

- 在传递的时候不会立即执行

- 是一个闭包（满足一个函数在另一个函数内）

- 执行前最好做一个类型判断（typeof callback === 'function'）

- [x] 箭头函数与普通function的区别
- 不绑定this，继承于父类的this？
- 没有函数内置的参数arguments

- [x] 调用普通function时，this指向的是window？ <br>
 指向全局global，global是一个虚构的概念，通常直接省略，在浏览器中的全局就是window

- [x] 前端构造器和函数的区别
- 功能一样，意义不一样。
- 大写的时候通常用来当构造函数，当函数内无return返回值或返回值为基本类型时，会被构造函数返回的实例覆盖
- 小写的时候，无返回值默认返回undefined，有返回值时就返回数据。
- 任何 JavaScript 函数都可以用作构造器。 也可以使用 new 操作符和构造函数来创建一个新对象

- [x] js的异常机制
- **RangeError**
创建一个error实例，表示错误的原因：数值变量或参数超出其有效范围。
- **ReferenceError**
创建一个error实例，表示错误的原因：无效引用。
- **SyntaxError**
创建一个error实例，表示错误的原因：eval()在解析代码的过程中发生的语法错误。
- **TypeError**
创建一个error实例，表示错误的原因：变量或参数不属于有效类型。
- **URIError**
创建一个error实例，表示错误的原因：给 encodeURI()或  decodeURl()传递的参数无效。

- [x] 怎么实现封装和继承<br>
封装可以通过闭包的方式，把闭包内的变量私有化，而提供getset方法。
继承可以通过原型链的关系，方式有类继承，原型继承，组合继承这些。
一般约定以_开头的为私有的变量和方法

- [x] 创建对象的7种方式<br>
https://github.com/mqyqingfeng/Blog/issues/15
- 定义对象字面量
- 使用工厂函数构造
- 使用构造函数
- 原型模式
- 组合模式（这个应该是比较常用的）
- 动态原型模式
- 寄生构造函数模式（new Object()）
- 通过bind返回一个函数对象？

- [x] var和let的区别
- var是将变量提升到顺序最前，而非全局
- let只能在使用前声明
```
var fn = function() {console.log(a)}
var a = 1
// 相当于
var a
var fn = function() {console.log(a)}
a = 1

```

- [x] 在访问一个对象的属性时，JavaScript 将执行下面的步骤：
- 检查本地值是否存在。如果存在，返回该值。
- 如果本地值不存在，检查原型链（通过 __proto__ 属性）。
- 如果原型链中的某个对象具有指定属性的值，则返回该值。
- 如果这样的属性不存在，则对象没有该属性

- [x] 函数的prototype中包括两个属性：
- constructor
- \_\_proto__

- [x] new做的操作
1. new 操作符创建了一个新的通用对象，并将其 __proto__ 属性设置为 Engineer.prototype。
2. new 操作符将该新对象作为 this 的值传递给 Engineer 构造器
3. 返回这个对象

```
var obj = {}
// 对象的赋值操作会指向同一个内存中真正的对象
obj.__proto__ = Constructor.prototype
Constructor.call(obj)
// 如果构造函数有返回值，并且返回值是个对象，则覆盖掉新建的对象
//     if (typeof o() === 'Object') {
//        return o()
//     }
return obj
```
- [x] Object.create()做的操作

```
Object.create = function (o) {
    var fn = function () {}
    fn.prototype = o // 这里一般传对象的prototype
    // 把父类的prototype当做__proto__返回
    // 当User.prototype = Object.create(Person.prototype)时
    // 相当于把User.prototype内的constructor和__proto__重写成父类的__proto__
    // 当var o = Object.create(Person.prototype)时
    // 相当于创建Person{}
    return new fn
    // var obj = {} // 相当于后面又执行了这几步操作，省去了执行函数内的代码
    // obj.__prop__ = fn.prototype
    // fn.call(obj)
}
```
- [x] Object的原型是什么？<br>
Object是一个内置的构造函数，可以说是所有对象的原型。函数的Prototype其实是伪属性__proto__的指向。Object.prototype.__proto__ = null

```
function Person() {
    this.name = 'wdq'
}
function User() {

}
function newTest(o) {
    var obj = {}
    obj.__proto__ = o.prototype
    o.call(obj)
    // obj.name，最终是Child.prototype = obj，所以是Child.prototype.name
    return obj 
}
User.prototype = newTest(Person)
User.prototype.constructor = User
var p1 = new User()
// User { name: 'wdq', constructor: [Function: User] } 
console.log(Object.getPrototypeOf(p1)) // ES6中__proto__的标准实现
// User { name: 'wdq', constructor: [Function: User] }
console.log(p1.__proto__)
console.log(p1.__proto__.__proto__) // Person {}
console.log(p1.__proto__.__proto__.__proto__) // {}
console.log(p1.__proto__.__proto__.__proto__.__proto__) // null
```

- [x] instanceof原理是什么？手动实现一个instanceof
- 首先instanceof使用方式是，左边为实例，右边为构造函数
- 而实例有一个__proto__属性，函数有一个prototype属性
- 而instanceof判断的就是实例的__proto__和函数的prototype是否指向同一个原型
- 如果这个构造函数还不是Object，那么久一层层往上看这个函数的原型。因为原型也是一个对象，会有__proto__属性。所以instance.__proto__.proto__是等于Constructor.prototype.__proto__的
- 所以instanceof查看的是这个实例是否在这个构造函数的原型链中

- [x] instanceof 和 typeof 和 isPrototypeOf的区别？
1. instanceof
- 结构：对象 instanceof  构造函数
- 查看对象的__proto__有没有在构造函数的prototype的原型中
- 构造的函数的prototype是可以在运行时改变的
![image](https://github.com/waldonUB/imageSave/blob/master/instanceof_relative.png)
2. isPrototypeOf
- 结构：Object.prototype.isPrototypeOf(obj)，左边为原型对象，右边为要查找的实例
- 和instanceof一样，都是查找要判断的对象是否在原型链上

3. typeof
- 结构：typeof 对象，返回一个类型字符串
- Undefined "undefined"
- Null "object"（见下文）
- Boolean "boolean"
- Number "number"
- String "string"
- Symbol （ECMAScript 6 新增） "symbol"
- 宿主对象（由JS环境提供） Implementation-dependent
- 函数对象（[[Call]] 在ECMA-262条款中实现了） "function"
- 任何其他对象 "object"
- 示例：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#%E7%A4%BA%E4%BE%8B


- [x]  谈谈对面向对象的理解？<br>
面向对象的三大特征是：封装，继承，多态。而js的面向对象是基于原型的，他的对象是由构造器和原型构造出来的。js中对属性和方法的封装可以通过构造函数或函数返回值来实现，继承可以通过原型实现，多态的话子类中重写父类的原型方法就算多态（js中没有重载的概念，只能重写）


- [x] 函数的节流和防抖？<br>
节流：固定的时间间隔内只触发一次，就是开枪射击一样，无论你点多块，他就只能射这么快。我们监听鼠标移动或者滚动条事件的时候，用户肉眼分辨的帧数是有限的，所以我们用节流来规定事件循环触发的这个间隔。
防抖：固定的时间间隔内，如果再一次触发操作，就要重新等待这个间隔。就像游戏加血的时候有读条，你再按一次加血他又会重新开始读条。比如说我们监听input事件或者键盘事件的时候，用户一直输入的时候可能并不想看到中途输入的结果，而且这么频繁会造成资源的浪费，用防抖等超过这个间隔，函数才执行
https://juejin.im/entry/58c0379e44d9040068dc952f
https://juejin.im/post/5b8de829f265da43623c4261
---
# vue
- [x] vue的生命周期？  
- 通常会用到created和mounted
- created是在操作data数据的时候就可以用了，比如说打开某个页面的时候就自动去查页面表格的数据
- mounted是在html渲染完之后用来操作dom节点的，比如说我们用echarts或百度地图的时候，都会用document.getElementById来操作dom节点
- beforeMounted也可以，这里的时候html页面也获取到了，只是data内的数据还没有渲染进去
- this.nextTick和setTimeout，nextTick用来等渲染完dom之后再操作，在mounted之后；setTimeout是把异步任务放在队列之后，等生命周期初始化完成后，再执里面的操作

- [x] vue中组件的销毁钩子用法？
- 用来销毁定时器和一些动画效果。比如说把定时器的id设在data函数中然后再beforeDestroy的时候clear

```
//组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。
beforeDestroy(){
     //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么停止。
    clearInterval(this.intervalId);
}
```
