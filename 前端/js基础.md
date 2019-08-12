## 数据类型
### 基本类型
#### 1. 数值 
- 123 // 整型
- 1.2 // 浮点型
- -1 // 负数
- NAN // not a number
- Infinity // 超过最大值或最小值
- 整数（整型）
- 真假倾向：只有0为false其他均为true  
- 小数（浮点数）  
- NaN  
一枚奇葩的'Number'类型  
NaN 不是一个数（Not a Number）  
#### 2. 字符串  String
- 单引号  ''
- 双引号  ""
- 反引号  ``
#### 3. 布尔值  Boolean
#### 4. null
#### 5. undefined
#### 6. Symbol
### 引用类型
#### 7.1 数组 Array   
##### 常用方法  
- push(新元素) 从末尾添加  
- unshift(新元素) 从开头添加  
- pop() 从末尾删  
arr.pop(); // 返回被删除的数  
- shift() 从开头删  
arr.shift(); //  返回被删除的数  
- reverse() 颠倒顺序  
[1, 2, 3].reverse(); // [3, 2, 1]  
- splice(index, length, 替换元素1, 替换元素2) 剪接  
var arr = ['a', 'b', '辣鸡1', '辣鸡2', 'c'];  
// 从第3格开始剪，剪2格  
arr.splice(2, 2); // ["辣鸡1", "辣鸡2"] 返回减掉的东西  
console.log(arr); // ["a", "b", "c"]
- slice(start，end) 剪裁  
返回剪裁的新数组，不影响原数组。
- filter(回调函数) 过滤器  
通过你给他的条件返回一个新数组  
- every(回调函数) 每一条  
每一条都满足你给的条件,才返回true

#### 7.2 对象Object
   
```   
typeof object 和 typeof array 都返回object   
```   
   

---

### window对象   
-  alert() // 用于提示的三个函数，遇到的时候会停止   
-  confirm()   
-  prompt   
-  setTimeout() // 延迟   
-  setInterval() //    

### 函数传参
- function()
- function.call() // 第一个参数是this指向的对象，后面是多个参数
- function.apply() // 第一个参数是this指向的对象，后面是一个参数的数组
- function.bind() // 第一个参数是this指向的对象，返回一个新的function
### 立即调用函数表达式（英文：immediately-invoked function expression，缩写：IIFE）
一般用于隔离作用域，一个文件写一个，防止一不小心污染全局变量。

### this
http://wiki.jikexueyuan.com/project/node-lessons/scope-closure.html
- 有对象就指向调用对象
- 没调用对象就指向全局对象
- 用new构造就指向新对象
- 通过 apply 或 call 或 bind 来改变 this 的所指。

### 浅拷贝和深拷贝
https://juejin.im/post/5c6ad9fde51d453c356e37d1
https://yanhaijing.com/javascript/2018/10/10/clone-deep/
#### 概念：
浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
浅拷贝的实现方式（详见浅拷贝与深拷贝）：
1. Object.assign()：需注意的是目标对象只有一层的时候，是深拷贝
1. Array.prototype.concat()
1. Array.prototype.slice()
#### 概念：
深拷贝就是在拷贝数据的时候，将数据的所有引用结构都拷贝一份。简单的说就是，在内存中存在两个数据结构完全相同又相互独立的数据，将引用型类型进行复制，而不是只复制其引用关系。
#### 深拷贝需要注意的四个点
1. 没有对参数做检验
2. 判断是否对象的逻辑不够严谨
3. 没有考虑数组的兼容
4. 有没有爆栈（这是递归最大的问题）

#### 深拷贝的实现方式：

1. 热门的函数库lodash，也有提供_.cloneDeep用来做深拷贝
2. jquery 提供一个$.extend可以用来做深拷贝
3. JSON.parse(JSON.stringify())
4. 手写递归方法

```
//定义检测数据类型的功能函数
function checkedType(target) {
  // 得到的结果是[Object, * ]，所以一般取后面的值
  return Object.prototype.toString.call(target).slice(8, -1)
}
//实现深度克隆---对象/数组
function clone(target) {
  //判断拷贝的数据类型
  //初始化变量result 成为最终克隆的数据
  let result,
    targetType = checkedType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  //遍历目标数据
  for (let i in target) {
    //获取遍历数据结构的每一项值。
    let value = target[i]
    //判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
      //对象/数组里嵌套了对象/数组
      //继续遍历获取到value值
      result[i] = clone(value)
    } else {
      //获取到value值是基本的数据类型或者是函数。
      result[i] = value
    }
  }
  return result
}

```

### 基本类型和引用类型
https://segmentfault.com/a/1190000006752076  
基本数据类型：String、number、boolean、null、undefined、symbol
#### typeof关键字
typeof 有7种类型（undefined number string boolean symbol object function）
#### 栈和堆的区别
- 栈内存中包括了变量的标识符和变量的
![image](https://segmentfault.com/img/bVCunf)
引用类型：统称Object，包括object，array，function，Date，regExp
- 栈内存中保存了变量标识符和指向堆内存中该对象的指针<br/>
   堆内存中保存了对象的内容
![image](https://segmentfault.com/img/bVCuGx)<br/>

---

### js的继承方式
#### 常见的6种继承
- 类式继承（借用构造函数继承）
```
Parent.call(Child) // 将子类的原型指向父类
```
- 原型链继承（让子类的原型（prototype）= 父类的实例）
```
Child.prototype = new Parant()
```
- 组合继承（会产生二次调用的问题）

```
function Father(age, sex) {
    this.age = age
    this.sex = sex
}

function Son() {
    Father.call(this) // 继承实例属性
    this.age = 16
}
Son.prototype = new Father() // 继承父类方法
Son.prototype.constructor = Son // 可选，修复子类构造函数的指向
```


- 原型式继承

```
// 其实就是Object.create()
function create(obj) {
    function F1() {} // 定义一个临时的构造函数
    F1.prototype = obj // 让传入的对象作为构造函数的原型
    return new F1 // 返回这个构造函数的实例
}
```

- 寄生式继承（先原型继承，再增强）

```
function createAnother(original){ 
var clone = object(original); // 这里相当于Object.create()
//通过调用object函数创建一个新对象 
clone.sayHi = function(){
//以某种方式来增强这个对象 
alert("hi"); 
}; return clone;//返回这个对象 
}
```
- 寄生组合式继承 （解决组合继承二次调用的问题）

```
function extend(subClass, superClass) {
    var Fn = function () {}
    Fn.prototype = superClass.prototype
    subClass.prototype = new Fn()
    subClass.prototype.constructor = subClass // 增强对象
}
```

### 原型链
#### 定义
首先JS是一门基于原型的语言，通过实例的继承的构造函数，再到构造函数可能会继承的另一个函数，一层层往上，最后到Object.prototype的原型，这一条类似于链状的继承就叫做原型链。
#### 4种创建对象和生成原型链的方式  
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#%E8%AF%AD%E6%B3%95%E7%BB%93%E6%9E%84%E5%88%9B%E5%BB%BA%E7%9A%84%E5%AF%B9%E8%B1%A1<br>
1. **语法结构创建的对象(对象字面量)**<br>
var obj = {} <br>
var arr = []
2. **构造器创建的对象**<br>
new
3. **Object.create 创建的对象**<br>
4. **class 关键字创建的对象**<br>
这些新的关键字包括 class, constructor，static，extends 和 super

```
// 对象字面量
var obj = {}
var arr = []
// 会返回对应的对象类型，比如Array，Object，String
var obj1 = new Object({})

// 构造函数
function Person() {

}
var person = new Person()

// Object.create，创建一个临时的构造函数，返回他的实例
var Person1 = {name: 'wdq'}
var p1 = Object.create(Person1)
```


### new和普通调用function的区别
- 如果return一个引用类型的对象，就覆盖new创建的匿名对象；
无return或者return基本类型，就会被匿名对象覆盖
- 普通function调用会返回return的值，无return默认return undefined
- new的时候执行了三个步骤
```
var user = {} // 创建一个user的对象
//把Person.prototype赋给(因为是引用类型，所以应该是指向)user的__proto__
user.__proto__ = Person.prototype 
Person.call(user, name) // this指向user
```

```
// 另一种加了判断的写法
function(Constructor) {
    var o = Object.create(Constructor.prototype)
    var type = Constructor.call(o)
    if (typeof type === 'object') { // typeof返回的都是小写
        return type
    } else {
        return o
    }
}
```

### 闭包
**定义**<br>
-  闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。这些局部变量在函数返回后不会被垃圾回收机制回收。
- 我们常用到的回调函数，单体模式等等都是闭包的一些应用。<br>
**缺点**<br>
会消耗比较多的内存而且影响性能
**解决办法**<br>
在函数退出前，清除不用的变量

```
var fn = (function () {
    var userInfo = {
        name: 'wdq',
        age: 12
    }
    return function () {
        // delete userInfo.name 在退出函数前把不用的局部变量删除
        // userInfo = null 清除引用
        return userInfo
    }
}())
// js垃圾回收的两种机制：
1. 引用计数
2. 标记清除
```


---
###### 回调函数
**特点**<br>
- 是个闭包
- 不会立即执行
- this指向的是调用他的时候的函数，而不是定义传参的时候 <br>
**作用**<br>
- 

###### onload事件
定义：图片或文档加载完成才会调用这个方法，是个回调函数？
- window.onload：确保Html中DOM节点全部加载完成，才调用这个function，一般用于在里面操作DOM节点
- img.onload：图片加载完成调用。

###### delete
delete 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放.let const var声明的不会被删除，通常用来删除对象的属性

###### Object对象N种遍历方法
1. **for...in...**：可以遍历原型链和自身所有的可枚举属性
2. **Object.keys()**：可以遍历自身所有可枚举属性
3. Reflect.ownKeys()：可以遍历自身所有属性，包含Symbol
4. **Object.getOwnPropertyNames()**：可以遍历自身所有属性，不包含Symbol
5. Object.getOwnPropertySymbols()：遍历自身所有Symbol属性
6. Object.getOwnPropertyDecscriptors()：遍历自身描述器属性，不包括原型链的
## 判断函数
### 判断数组
- Object.prototype.toString.call(arr).slice(8, -1)
- Array.isArray(arr)
- arr instanceof Array