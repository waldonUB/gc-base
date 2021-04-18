// class Picture{
//     shape() {
//         console.log(`我已经有形状了`)
//     }
// }
//
// function drawColor() {
//     console.log(`我来上色了`)
// }
//
// class ColorDecorator {
//     constructor(picture) {
//         picture.drawColor = drawColor
//     }
// }
//
// (function f() {
//   var picture = new Picture()
//   new ColorDecorator(picture)
//   picture.shape()
//   picture.drawColor()
// }())

/**
 * 在原有的对象上装饰更多行为，并保持原有对象不变
 * */
let picture = {
  shape: function () {
    console.log(`我有形状了`)
  }
}
function drawColor(picture) {
  console.log(`我可以上颜色了`)
}
function drawIcon(picture) {
  console.log(`我有图标了`)
}
function decorator(sourceObj, decorateFn) {
  sourceObj[decorateFn.name] = decorateFn
}

;(function f() {
  picture.shape()
  decorator(picture, drawColor)
  picture.drawColor()
})()
