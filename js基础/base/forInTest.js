var arr = [1, 2, 3]
var arr2 = arr
arr2[0] = 4
for(let item in arr) {
    console.log(arr[item])
}

function CreateObj() {
    this.name = 'wdq'
    this.age = 18
}
CreateObj.prototype.sex = '女'


var obj = {
    name: "wdq",
    age: 12
}
obj.__proto__.sex = '男'

var obj2 = new CreateObj()
for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
        console.log(item)
    }
}

for (let item in obj2) {
    if (obj2.hasOwnProperty(item)) {
        console.log(item)
    }
}
// js千分位的方法，最多只能到小数点后三位
var num = 1000000.6688
console.log(num.toLocaleString())

var a = "abc"
// for in 不能迭代string
// for(let key in a) {
//     console.log(key)
// }

for (let item of a) {
    console.log(item)
}

// var obj1 = {
//     name: "wdq",
//     age: 12
// }
// for(let item of obj1) { // TypeError: obj1 is not iterable
//     console.log(item)
// }
