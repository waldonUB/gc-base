// class MySocket{
//     charge() {
//         console.log(`我是一个220V的充电口`)
//     }
// }
// // 适配器是把主对象的方法重写？实际上还是引用主对象的方法？
// // 这个是错误的，本质还是要用源对象的方法，只是接口名称变了，具体参照JQ的$的实现
// class ChargeAdapter{
//     constructor(mySocket) {
//         mySocket.charge = function () {
//             console.log(`我被转成了5V的接口`)
//         }
//     }
// }
//
// (function f() {
//     var mySocket = new MySocket()
//     new ChargeAdapter(mySocket)
//     mySocket.charge()
// }())

// var $ = function (typeAndId) {
//     if (typeof typeAndId !== 'string') {
//         throw new Error(`非法字符串`)
//     }
//     var type = typeAndId.split('')[0]
//     var id = typeAndId.split('').filter((item, index) => index !== 0).join('')
//     return jQuery(type + id)[0]
// }
// $("#id")
