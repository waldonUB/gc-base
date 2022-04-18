let _AI = function () {
  this.callback = []
  this.next = function () {
    const fn = this.callback.shift()
    fn && fn()
  }
}

const AI = new _AI()

AI.talk = function (str) {
  if (!this.callbacks) {
    this.callbacks = []
  }
  this.callbacks.push({
    next: () => {
      console.log(str)
    },
  })
  setTimeout(() => {
    const { next } = this.callbacks.shift()
    next()
  })
  return this
}

_AI.prototype.cancel = function () {
  this.callbacks.pop()
}

_AI.prototype.sleep = function (delay) {
  if (!this.callbacks) {
    this.callbacks = []
  }
  this.callbacks.push({
    next: () => {
      console.log(str)
    },
  })
  setTimeout(() => {
    const { next } = this.callbacks.shift()
    next()
  })
  return this
}

AI.sleep(3000).cancel().talk('ss').sleep(2000).talk('111')
