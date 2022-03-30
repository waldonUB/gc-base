const _AI = function () {
  this.callbacks = []
  this.running = false
}

const AI = new _AI()

_AI.prototype.talk = function (str) {
  const fn = function () {
    return new Promise((resolve, reject) => {
      console.log(str)
      resolve()
    })
  }
  this.callbacks.push(fn)

  this.execute()
  return this
}

_AI.prototype.cancel = function () {
  this.callbacks.shift()
  return this
}

_AI.prototype.sleep = function (delay) {
  const fn = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, delay)
    })
  }
  this.callbacks.push(fn)
  return this
}

_AI.prototype.execute = function () {
  if (this.running) {
    return
  }
  this.running = true
  setTimeout(async () => {
    for (const fn of this.callbacks) {
      await fn()
    }
    this.running = false
  }, 0)
}

AI.sleep(3000).cancel().talk('ss').sleep(2000).talk('111')
