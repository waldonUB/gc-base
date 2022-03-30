let _AI = function () {
  this.callback = []
  this.next = function () {
    const fn = this.callback.shift()
    fn && fn()
  }
}

const AI = new _AI()

AI.talk = function (str) {
  const fn = function () {
    console.log(str)
  }

  this.callback.push(fn)
  setTimeout(() => {
    this.next()
  }, 0)
  return this
}

_AI.prototype.cancel = function () {
  if (this.callback.length) {
    this.callback.shift()
  }
  return this
}

_AI.prototype.sleep = function (delay) {
  const _this = this
  const fn = function () {
    setTimeout(() => {
      _this.next()
    }, delay)
  }
  this.callback.push(fn)

  return this
}

AI.sleep(3000).cancel().talk('ss').sleep(2000).talk('111')
