var module = (function () {
    var obj = {}
    var count = 0
    obj.add = function() {
        obj.num = ++count
    }
    return obj
}())
module.add()
console.log(module.num)
module.add()
console.log(module.num)
module.num = 10
console.log(module.num)
module.add()
console.log(module.num)
