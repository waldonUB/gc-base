function Observer() {
  let callbacks = []
  this.subscribe = function (topic, callback) {
    callbacks.push({ topic, callback })
  }
  this.unsubscribe = function (topic) {
    callbacks = callbacks.filter((item) => item.topic !== topic)
  }
  this.notify = function () {
    setTimeout(function () {
      callbacks.forEach((item) => {
        item.callback()
      })
    }, 0)
  }
}
let observer = new Observer()
observer.subscribe('eat', function () {
  console.log(`我回去吃饭了`)
})
observer.subscribe('go', function () {
  console.log(`我下班啦`)
})
observer.notify()
observer.subscribe('go', function () {
  console.log(`我下班啦2`)
})
observer.unsubscribe('eat')
