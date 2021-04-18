let observers = []
// 这种就相当于模块模式
const Observer = {
  publish: function () {
    setTimeout(function () {
      for (let item of observers) {
        item.callback()
      }
    }, 0)
  },
  subscribe: function (topic, callback) {
    observers.push({topic, callback})
  },
  remove: function (topic) {
    observers = observers.filter(item => item.topic !== topic)
  }
}
Observer.subscribe('hello', function () {
  console.log(`我是hello`)
})
Observer.subscribe('hi', function () {
  console.log(`我是hi`)
})
Observer.publish()
Observer.remove('hi')
