var Subject = function () {}
;(function f() {
  var observers = {}
  Subject.prototype.publish = function (topic, args) {
    if (!observers[topic]) {
      return false
    }
    setTimeout(function () {
      // 这里为啥要放到队列最后？
      var subscribers = observers[topic]
      subscribers.forEach(function (item) {
        item(args)
      })
    }, 0)
  }
  /**
   * @param topic 订阅的事件的主题
   * @param func 订阅时间的具体方法
   * */
  Subject.prototype.subscribe = function (topic, func) {
    if (!observers[topic]) {
      // 是否存在这个主题的观察者
      observers[topic] = []
    }
    observers[topic].push(func)
  }
  Subject.prototype.unsubscribe = function () {}
})()

var subscriber1 = new Subject()
var subscriber2 = new Subject()
var subscriber3 = new Subject()
subscriber1.subscribe('top1', function (name) {
  console.log(`我是订阅者：` + name)
})
subscriber2.subscribe('top1', function (name) {
  console.log(`我是订阅者：` + name)
})
subscriber3.subscribe('top1', function (name) {
  console.log(`我是订阅者：` + name)
})
Subject.prototype.publish('top1', 'wdq')
