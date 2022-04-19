// 实现AI.talk('sss').sleep(3000).talk('aaa').sleep(1000).cancel().talk('555')

// todo waldon sleep有点bug
const _AI = function () {
  this.callbacks = []
  this.next = function () {
    const fn = this.callbacks.shift()
    fn && fn()
  }
}

_AI.prototype.talk = function (str) {
  const _this = this
  const fn = function () {
    console.log(str)
  }
  this.callbacks.push(fn)
  setTimeout(() => {
    _this.next()
  })
  return this
}

_AI.prototype.sleep = function (delay) {
  const _this = this
  const fn = function () {
    setTimeout(() => {
      _this.next()
    }, delay)
  }
  this.callbacks.push(fn)
  return this
}

_AI.prototype.cancel = function () {
  if (this.callbacks.length) {
    this.callbacks.pop()
  }
  return this
}

const AI = new _AI()

// AI.talk('sss').sleep(3000).talk('aaa').sleep(1000).cancel().talk('555')
AI.talk('sss').sleep(3000).talk('aaa').sleep(1000).talk('555')
// AI.talk('sss').sleep(3000).talk('aaa')
