var F = function () {}
var Bar = function () {}
Bar.prototype = new F()

F.prototype.sex = '男'
var bar = new Bar()
console.log(bar.sex)
