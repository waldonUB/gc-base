let _ = require("lodash")
let $ = require("jquery")

let obj = {
    a: {obj: 1}
}
let obj1 = obj
let obj2 = _.cloneDeep(obj)
// let obj3 = $.extend(obj)
console.log(obj.a === obj1.a)
console.log(obj.a === obj2.a)
// console.log(obj.a === obj3.a)
