var userInfo = {
    name: 'wdq',
    age: 22
}
var userInfo2 = {
    name: 'ksl',
    age: 22
}
var f = (function () {
    var name = ''
    return function (obj) {
        if (!name) {
            name = obj.name
        }
        return name
    }
}())
console.log(f(userInfo))
console.log(f(userInfo2))

