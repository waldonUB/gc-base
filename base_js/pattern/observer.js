var observers = []
var Observer = function (userName) {
  this.subscribeUser = userName
  this.subscribe = function (topic, callback) {
    observers.push({ name: topic, fn: callback, userName: this.subscribeUser })
  }
  this.unSubscribe = function (topic) {
    observers = observers.filter(
      (item) => item.name !== topic && item.userName !== this.subscribeUser
    )
  }
  this.publish = function (topic) {
    observers.forEach(function (item) {
      if (typeof item.fn === 'function' && item.name === topic) {
        setTimeout(function () {
          // setTimeout的作用，执行顺序？
          item.fn()
        }, 0)
      }
    })
  }
}

var observer1 = new Observer('wdq')
var observer2 = new Observer('ksl')
observer1.subscribe('call', function () {
  console.log(`I will come back`)
})
observer2.subscribe('call', function () {
  console.log(`I will come observer2`)
})
observer1.publish('call')
