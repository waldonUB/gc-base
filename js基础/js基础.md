### 数据类型

#### 基本类型

##### 数值 Number

- 123 // 整型
- 1.2 // 浮点型
- -1 // 负数
- NAN // not a number
- Infinity // 超过最大值或最小值
- 整数（整型）  
  如：1，-1
  怎么判断一个值是否为整型？  
  Number.isInteger(1) // true  
  Number.isInteger(1.1) // false  
  其他类型怎么转整型？  
  parseInt('1') // 1  
  parseInt('1.1') // 1  
  parseInt('1.9') // 1  
  parseInt('1a') // 1  
  parseInt('a1') // NaN  
  parseInt('.9') // NaN  
  parseInt('0.9') // 0
- 真假倾向：只有 0 为 false 其他均为 true  
  !!0 // false  
  !!1 // true  
  !!0.1 // true  
  !!-1 // true
- 小数（浮点数）  
  如：0.1，1.1，.1 如果小于 1，小数点前的 0 可以省略  
  其他类型转浮点数  
  parseFloat('1') // 1  
  parseFloat('1.0') // 1  
  parseFloat('1.1') // 1.1  
  parseFloat('1.1a') // 1.1  
  parseFloat('a1.1') // NaN  
  parseFloat('.1') // 0.1
- NaN  
  一枚奇葩的'Number'类型  
  NaN 不是一个数（Not a Number）  
  对，它不是一个数，然后它还是种数字类型。(O_o)???  
  一般在出错或不可预料的结果中出现，如：'a' \* 'b'，0 / 0
  NaN === NaN // false 永不相等  
  判断是否为 NaN 可以使用 isNaN()函数  
  isNaN(1) // false  
  isNaN(0 / 0) // true

##### 字符串 String

- 单引号 ''
- 双引号 ""
- 反引号 ``如何定义一段字符串？ 很简单，用引号包起来就好 "yo" 双引号 'yo' 单引号 在JS中单双引号没有任何区别 "yo" === 'yo' // true `我是个模板字符串，我叫 ${name} ` 使用`（反引号）定义模板字符串，可以传入变量，还可以直接断行  
  常用方法  
  获得字符串中的某一个字符  
  'yo'.charAt(0); // "y" 程序员是从 0 开始数的  
  'yo'.charAt(1); // "o"  
  'yo'[0]; // "y"  
  检查一段字符是否包含另一段字符  
  '花花你好'.includes('花花'); // true  
  '花花你好'.includes('拴蛋'); // false  
  用字符串将字符串分割为数组  
  '花花 →*→ 拴蛋 →*→ 背背'.split('→_→'); // ["花花", "拴蛋", "背背"]  
  连接字符串  
  'y'.concat('ooo', 'oo', 'o'); // "yoooooo"，依次连接传入的字符，传参数量不限  
  截取字符串  
  var str = '王花花和小熊跳舞跳呀跳呀一二一';  
  str.slice(3, 8); // "和小熊跳舞"，第一个传参为开始索引，第二个传参为结束索引  
  str.slice(3); // "和小熊跳舞跳呀跳呀一二一"，若省略第二个传参将会截取至最后一个字符  
  .trim 移除两头的空格  
  ' yo '.trim(); // "yo"  
  ' yo'.trim(); // "yo"  
  注意  
  不加引号的字符会被 JS 认为是变量，所以字符串一定是加引号的  
  var greet = yo; // ReferenceError（引用错误） 变量 yo 没有定义  
  单双引号定义的字符串不可直接断行，断行可以需使用加号连接  
  '他好  
  我也好' // SyntaxError（语法错误）  
  // -----------------------  
  '他好' +  
  '我也好' // '他好我也好'  
  字符串与数字运算时需要格外小心  
  '1' + 1 // "11" 坑  
  1 + "1" // 2  
  2 _ "2" // 4 (O_o)???  
  "2" _ 2 // 4 (O_o)???  


##### 布尔值 Boolean

#### 引用类型

##### 数组 Array

语法  
定义数组  
首先是中括号（方括号）

[]  
里面的每一项叫元素 (element)

[2, 4, 6]  
元素类型不限

[
 2,
 true,
 'a',
 {},
 function() {}
]  
还能嵌套

[ 1, ['a', 'b', 'c']]  
[[[[[[[[['yo']]]]]]]]] // 就是有这种操作  
获取元素  
每一个元素都有一个用于定位的索引 (index；也就是元素的身份证号，从 0 开

var 排排坐 = [
 'a', // 0 程序员是从 0 开始数的
 'b', // 1
 'c', // 2
 'd', // 3
 // ...
];  
知道索引就能获取元素

// 一维数组  
var 排排坐 = ['a', 'b', 'c'];  
排排坐[0] // 'a'  
排排坐[1] // 'b'  
排排坐[2] // 'c'

// 多维数组  
var 各种排排坐 = [['a1', 'a2'], ['b1', 'b2'], ['c1', ['c2']]];  
各种排排坐[0][0] // 'a1'  
各种排排坐[1][0] // 'b1'  
各种排排坐[2][0] // 'c1'

各种排排坐[0][1] // 'a2'  
各种排排坐[1][1] // 'b2'  
各种排排坐[2][1][0] // 'c2'  
通过.length 获取数组的长度（里面有几个元素）

[5, 10, 15].length // 3  
常用方法  
.push(新元素) 从末尾添加  
var arr = [3, 4, 5];  
arr.push(6); // 4 返回修改后的长度  
console.log(arr); // [3, 4, 5, 6]  
.unshift(新元素) 从开头添加  
var arr = [3, 4, 5];  
arr.unshift(2); // 4 返回修改后的长度  
console.log(arr); // [2, 3, 4, 5]  
.pop() 从末尾删  
var arr = [3, 4, 5, 6];  
arr.pop(); // 6 返回被删除的数  
console.log(arr); // [3, 4, 5]  
.shift() 从开头删  
var arr = [2, 3, 4, 5];  
arr.shift(); // 2 返回被删除的数  
console.log(arr); // [3, 4, 5]  
.reverse() 颠倒顺序  
[1, 2, 3].reverse(); // [3, 2, 1]  
.splice(从哪剪, 剪多长, 替换元素 1, 替换元素 2) 剪接  
var 片儿 = ['a', 'b', '辣鸡 1', '辣鸡 2', 'c'];  
// 从第 3 格开始剪，剪 2 格
片儿.splice(2, 2); // ["辣鸡 1", "辣鸡 2"] 返回减掉的东西
console.log(片儿); // ["a", "b", "c"]

// 注意，现在片儿已经剪成了['a', 'b', 'c']
// 从第 2 格开始剪，剪 1 格，进两个广告
片儿.splice(1, 1, '广告 1', '广告 2');
console.log(片儿); // ["a", "广告 1", "广告 2", "c"]
.slice(从哪剪，在哪停) 剪裁
返回剪裁的新数组，不影响原数组。

var 片儿 = ['a', 'b', '辣鸡 1', '辣鸡 2', 'c'];
// 从第 3 格开始剪，剪 2 格
var 垃圾堆 = 片儿.slice(2, 4); // ["辣鸡 1", "辣鸡 2"] 返回减掉的东西
console.log(垃圾堆); // ["辣鸡 1", "辣鸡 2"]
.forEach(回调函数) 迭代
['a', 'b', 'c'].forEach(function(每一条, 索引) {  
 console.log('第' + 索引 + '条：' + 每一条);  
});

//------Console------  
// 第 0 条：a  
// 第 1 条：b  
// 第 2 条：c  
.filter(回调函数) 过滤器  
通过你给他的条件返回一个新数组

var 旧数组 = [1, 2, 3, 4];  
var 新数组 = 旧数组.filter(  
 // 传入一个函数，每迭代一个元素就执行一次  
 function(元素, 索引, 原始数组) {  
 // 只要大于 2 的元素  
 var 条件 = 元素 > 2;  
 return 条件;  
 }  
);

console.log(新数组); // [3, 4]  
.every(回调函数) 每一条  
每一条都满足你给的条件

var 满足 = [1, 2, 3].every(  
 // 传入一个函数，每迭代一个元素就执行一次  
 function(元素, 索引, 原始数组) {  
 // 是否小于 10  
 var 条件 = 元素 < 10;  
 return 条件;  
 }  
);  
/_只有当所有条件都满足时才返回 true_/  
console.log(满足); // true

##### 对象 Object

```
typeof object 和 typeof array 都返回object
```

### 运算符

##### == // 判断相等

##### === // 判断相等(严格模式)

### window 对象

##### alert() // 用于提示的三个函数，遇到的时候会停止

##### confirm()

##### prompt

##### setTimeout() // 延迟

##### setInterval() //

### 函数传参

##### function()

##### function.call() // 第一个参数是 this 指向的对象，后面是多个参数

##### function.apply() // 第一个参数是 this 指向的对象，后面是一个参数的数组

##### function.bind() // 第一个参数是 this 指向的对象，返回一个新的 function

### 自触发函数 (IIFE)

一般用于隔离作用域，一个文件写一个，防止一不小心污染全局变量。

正常版

启动();

```
function 启动() {
  'use strict';
  // ...
}
```

懒癌版

```
(function () {
  'use strict';
  // ...
})();

/*
可以这样理解
先用括号把这个匿名函数包起来：
(匿名函数)

然后执行：
(匿名函数)();
*/
```

js 里面有基本类型和封装类型的概念吗？

**this**
http://wiki.jikexueyuan.com/project/node-lessons/scope-closure.html

- 有对象就指向调用对象
- 没调用对象就指向全局对象
- 用 new 构造就指向新对象
- 通过 apply 或 call 或 bind 来改变 this 的所指。

---

**浅拷贝和深拷贝**
https://segmentfault.com/a/1190000006752076 <br/>
基本数据类型：String、number、boolean、null、undefined、symbol

- 栈内存中包括了变量的标识符和变量的
  ![image](https://segmentfault.com/img/bVCunf)
  引用类型：统称 Object，包括 object，array，function，Date，regExp
- 栈内存中保存了变量标识符和指向堆内存中该对象的指针<br/>
  堆内存中保存了对象的内容
  ![image](https://segmentfault.com/img/bVCuGx)<br/>

---

###### **js 的继承方式**

**常见的 6 种继承**<br>

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

---

###### 创建对象和生成原型链的方式 4 种

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#%E8%AF%AD%E6%B3%95%E7%BB%93%E6%9E%84%E5%88%9B%E5%BB%BA%E7%9A%84%E5%AF%B9%E8%B1%A1<br>

1. **语法结构创建的对象(对象字面量)**<br>
   var obj = {} <br>
   var arr = []
2. **构造器创建的对象**<br>
   new
3. **Object.create 创建的对象**<br>
4. **class 关键字创建的对象**<br>
   这些新的关键字包括 class, constructor，static，extends 和 super

---

###### *new*和普通调用 function 的区别

- 如果 return 一个引用类型的对象，就覆盖 new 创建的匿名对象；
  无 return 或者 return 基本类型，就会被匿名对象覆盖
- 普通 function 调用会返回 return 的值，无 return 默认 return undefined
- new 的时候执行了三个步骤

```
var user = {} // 创建一个user的对象
//把Person.prototype赋给(因为是引用类型，所以应该是指向)user的__proto__
user.__proto__ = Person.prototype
Person.call(user, name) // this指向user
```

###### 闭包

**定义**<br>

- 闭包是函数和创建的词法环境组成。
- 这些词法环境包括创建函数时，这个函数所能够访问的所有的局部变量和函数。
- 可以说他是函数局部变量的一个集合，而这些局部变量在函数返回后还会继续存在。
- 通常我们在一个函数内定义另一个函数就会产生闭包。
- 我们常用到的回调函数，单体模式等等都是闭包的一些应用。<br>
  **缺点**<br>
  会消耗比较多的内存而且影响计算效率
