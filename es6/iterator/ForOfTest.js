// 使用闭包
function MyIterator(arr) {
  this.arr = arr
}
// 想要被for...of...必须得有Symbol.iterator接口
MyIterator.prototype[Symbol.iterator] = function () {
  let index = 0
  var that = this
  return {
    next() {
      if (index < that.arr.length) {
        return {
          value: that.arr[index++],
          done: false
        }
      } else {
        return {
          value: undefined,
          done: true
        }
      }
    }
  }
}
var arr = [1, 2, 3]
var iter = new MyIterator(arr)
for (let item of iter) {
  console.log(item)
}
