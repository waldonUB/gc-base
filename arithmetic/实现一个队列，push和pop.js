function MyStack() {
  this.store = {}
  this.index = 0
}
MyStack.prototype.pop = function () {
  delete this.store[this.index]
  this.index--
}
MyStack.prototype.push = function (item) {
  this.index++
  this.store[this.index] = item
}

const stack = new MyStack()
stack.push({
  a: 1,
})
stack.push({
  b: 2,
})
console.log(stack)
stack.pop()
console.log(stack.pop())
