let  块级作用域：
if (true) {
    let a = 0;
}
console.log(a) // a 会报undefined

console.log(a)
let a   // a 会报undefined

const  常量
let user = {name : 'wdq', age: 12}
const INFO = user;
user.name = 'ak'
// INFO = null
INFO.name = 'w'  // 是可以的，因为指向的是对象，不是对象内的值
console.log(INFO)

变量的解构赋值
数组
var [a, b, c] = [1, 2, 3]

let [a, ...c] = [1, 2, 3]
console.log(c)  // [2, 3]

对象

var obj = {
    a: 1,
    b: 2
}
({a, b} = obj) // 相当于给ab重新赋值，不加括号会被当做代码块


let {a: B, b: A} = obj // 必须先指定一个值

字符串处理函数
console.log('YO'.include('Y'))  // true
console.log('YO'.startsWith('Y'))  // true
console.log('YO'.endsWith('O'))  // true
console.log('YO'.repeat(3)))  // YOYOYO

模板字符串
let title = 'my_title'
let template = `
<div>
    <span>${title}</span>
</div>
`

symbol
7种数据类型
String,Boolean,null,undefined,Number,Object,Symbol

Symbol每次的数据都是不一样的
let a = Symbol()
let b = Symbol()
console.log(a === b) // false

