function currying(a) {
    return function (b) {
        return a * b
    }
}

let x2 = currying(2)
let x4 = currying(4)

var num = x2(4)
var num1 = x2(6)
console.log(num)
console.log(num1)
