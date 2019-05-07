var Component = function () {

}
Component.prototype.data = {
    a: 1,
    b: 2
}
Component.prototype.newData = function () {
    return {
        a: 1,
        b: 2
    }
}
var c1 = new Component()
var c2 = new Component()
console.log(c1.data === c2.data)
console.log(c1.newData() === c2.newData())
