function getResult(num) {
    return num
}

let result = () => getResult(77)
let result2 = getResult(88)
let result3 = function() {
    return getResult(99)
}
let result4 = () => {
    return getResult(77)
}
console.log(result())
console.log(result2)
console.log(result3())
console.log(result4())

let promise = Promise.resolve(123)
let fn = () => Promise.resolve(456)
promise.then(function (result) {
    console.log(result)
})

fn().then(function (result) {
    console.log(result)
})
