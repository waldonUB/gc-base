## 变量
#### let  块级作用域：
不存在变量提升，定义只存在于块级作用域
```js
if (true) {
    let a = 0;
}
console.log(a) // a 会报undefined
// 或者这种写法
console.log(a)
let a   // a 会报undefined
```
#### const  常量

```js
let user = {name : 'wdq', age: 12}
const INFO = user;
user.name = 'ak'
// INFO = null
INFO.name = 'w'  // 是可以的，因为指向的是对象，不是对象内的值
console.log(INFO)
```
#### 变量的解构赋值

- ##### 数组

```js
var [a, b, c] = [1, 2, 3]

let [a, ...c] = [1, 2, 3]
console.log(c)  // [2, 3]
```


- ##### 对象


```js
var obj = {
    a: 1,
    b: 2
}
({a, b} = obj) // 相当于给ab重新赋值，不加括号会被当做代码块
```

```js
let {a: B, b: A} = obj // 必须先指定一个值
```
#### 字符串处理函数

```js
console.log('YO'.include('Y'))  // true
console.log('YO'.startsWith('Y'))  // true
console.log('YO'.endsWith('O'))  // true
console.log('YO'.repeat(3)))  // YOYOYO
```

#### 模板字符串

```js
let title = 'my_title'
let template = `
<div>
    <span>${title}</span>
</div>
`
```
#### symbol
7种数据类型:  
String,Boolean,null,undefined,Number,Object,Symbol


```js
// Symbol每次的数据都是不一样的
let a = Symbol()
let b = Symbol()
console.log(a === b) // false
```
## 函数
#### promise
- ##### 状态
  - pending  // 初始状态
  - rejected  // 失败
  - fulfilled  // 成功
- ##### 思路：
在使用then的时候，其实已经把要做的任务，添加到一个队列里面去了，然后通过监听pending，fulfiled，rejected这几个状态，再执行callbacks队列里面的任务，因为可能有多个任务，所以是依次执行。如果是不同的promise，应该是监听不同promise对象？
- ##### 四个注意的点：
1. Promise是一个构造函数
2. 接收一个函数executor作为参数
3. 函数中有两个参数resolve和reject，成功就resolve，否则就执行reject
4. then有两个参数onfullfilled和onrejected，分别对应resolve和reject
![promise图示](https://mengera88.github.io/images/promises.png)
- ##### 相关链接
    -  promise原理解读：https://segmentfault.com/a/1190000009478377?utm_source=tag-newest
    -  promiseA+规范：
    -  promiseA+的实现：https://zhuanlan.zhihu.com/p/21834559

#### async/await关键字
async：作为异步方法来使用。

```js
const foo = async function() {} // 函数表达式
async function foo () {} // 函数声明
```


await：后面一般跟的是一个promise对象，返回promise对象的值resolve或者reject的值；如果跟的是普通的值，则将这个值返回。（await后面跟的就是promise对象才会等待，不然写setTimeout也没用）

```js
// 如果是继发关系：
async function foo() {
    await function()
    await function ()
}
// 如果不存在依赖关系
async function bar() {
    let promise1 = new Promise(resolve => {})
    let promise2 = new Promise(resolve => {})
    await Promise.all([promise1, promise2])
}
```


#### 箭头函数
##### 4个特点
1. 继承父级作用域的this。如果是全局，无论是否严格模式都执行window
1. 没有内置参数arguments
1. 箭头函数”的this，总是指向定义时所在的对象，而不是运行时所在的对象
1. 不能用call，apply来更改this的指向
##### 代码示例

```js
function PersonX() {
    this.age = 0;
    var closure = "123"
    setInterval(()=>{ // 箭头函数的this是继承父类的，是定义时的对象
        console.log(this.age++)
    }, 1000);
}

function f() {
    var test = () => {
        console.log(this.a) // 输出2
    }
    test()
}
f.call({a: 2})

function foo() {
    return function () {
        // 用的是这一层的this，如果是多层箭头函数，就是最外层的this
        return () => {
            console.log('id:' + this.id)
        }
    }
}
foo().call({id: 1})()
```
##### 箭头函数的用法() => import() 

```js
// 有单个参数可以不用括号
// 本质上是
 () => {
    return import()
}

function() {
    return import()
}
```
## 操作对象的函数
#### Object.getPrototypeOf()
可以访问其他浏览器非标准方式实现的__proto__
#### Object.assign()
用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
## 操作数组的函数
#### for...of...
只要对象有Symbol.iterator属性，就可以用for...of...进行迭代  
- 目前具有Symbol.iterator的对象：  
    - Array
    - String
    - Map
    - Set
    - NodeList
    - 函数的arguments
    - TypeArray
- 一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”
Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环
- Object没有部署iterator的原因   
对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换

```js
// iterator的实现
function MyIterator(arr) {
    let index = 0
    return {
        next() {
            if (index < arr.length) {
                return {
                    value: arr[index++],
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
```

```js
// for...of...的实现

// 使用闭包
function MyIterator (arr) {
    this.arr = arr
}
// 想要被for...of...必须得有Symbol.iterator接口
MyIterator.prototype[Symbol.iterator] = function () {
    let index = 0
    var that = this
    return {
        next() {
            if (index < that.arr.length) {
                return {
                    value: that.arr[index++],
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
var arr = [1, 2, 3]
var iter = new MyIterator(arr)
for (let item of iter) {
    console.log(item)
}
```

#### forEach
#### Map
#### filter
#### every
#### reduce

```js
// 可以累加数值或者数组
otherCost = initList.reduce((prev, curr) => {
          let sum = 0
          otherCost.forEach(item => {
            if (Number(item.month) === curr.month) {
              sum += item.income_mny
            }
          })
          prev.push(sum.toFixed(2))
          return prev
        }, [])
```
#### some
#### find
#### findIndex
#### includes
判断某个元素是否在数组或者字符串中
#### slice
返回一个截取的字符串
- ##### parameter [begin, end]
    - 无参数默认全部
    - 只有一个参数默认begin，end为末尾
    - `` '123'.slice(1) // 23 ``
- ##### arguments和nodeList转数组

```
// arguments是个类数组对象，只能通过这种方式转
  let list = Array.prototype.slice.call(arguments)
  list.forEach()
```
- 其他类数组转数组的方法
    - Array.from(arr)
    - [...arr]
#### concat
用于合并数组，把多个数组合并成一个数组并返回新的数组

## 数据类型
### Map
#### Map和Object的6个区别
1. Object的键**一般为**Symbol或字符串，Map任意
2. Map可以通过size获取长度
3. Map是有序的
4. Map可以通过for of 迭代
5. Map不会跟原型上的键冲突
6. Map在增删改查会有些性能优势