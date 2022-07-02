const _AI = function () {
  this.callbacks = []
  this.running = false
  const _this = this

  function* execute() {
    for (const fn of _this.callbacks) {
      yield fn()
    }
  }

  this.executeInstance = execute()
}

const AI = new _AI()

_AI.prototype.talk = function (str) {
  const fn = function () {
    console.log(str)
  }
  this.callbacks.push(fn)

  this.executeInstance.next()
  return this
}

_AI.prototype.cancel = function () {
  this.callbacks.shift()
  return this
}

_AI.prototype.sleep = function (delay) {
  const _this = this
  const fn = function () {
    setTimeout(() => {
      _this.executeInstance.next()
    }, delay)
  }
  this.callbacks.push(fn)
  return this
}

AI.sleep(3000).cancel().talk('ss').sleep(2000).talk('111')
