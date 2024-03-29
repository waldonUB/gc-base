// waldon:
// 发布订阅模式和观察者模式的区别。
// 在说区别之前，我觉得首先要了解一下他们两个的应用场景。
// 本质上都是在一处地方改变时，另一处地方的状态得到更新。
// 观察者模式侧重的是在目标和观察者之间的一种一对多的依赖关系。
// 而发布订阅模式中则有一个事件中心的概念，发布者和订阅者不用考虑对方的存在，彼此之间通过事件中心来进行通信

// 举个生活的例子：
// 观察者模式就像，有快递到了的时候，快递员就送货上门，我就出来拿。
// 而当配送区域或者配送方式变得多且复杂的时候，这时候就需要一个驿站，快递员只需要把快递送到驿站，
// 驿站会发取件码给我，我只需要过去驿站拿就可以了。

// 实际项目中也很常见：
// 比如小程序中左上角的返回上一页按钮是不会带任何参数的。那我想在当前页面拿到上一个页面拿到的操作完成的场景，就可以在
// 这个页面跳转过去的时候订阅一个一次性的事件，然后在返回的时候发布，就可以在返回的时候额外做一些操作。
// 个人觉得最明显的一个区别是体现在一次性订阅消息上，这也是发布订阅模式比较灵活的地方。像用户的指引这种只需要显示一次的，还有微信小程序的一次性订阅消息。
// https://img2018.cnblogs.com/blog/849589/201904/849589-20190424122505055-2083728728.png 图解
/**
 * 自己实现的发布订阅模式
 * 这种一个key只能存一个事件，如果要标准的实现就用那种this.events[key].push()
 * @author waldon
 * @date 2021-09-20
 */
class PubSub {
  constructor() {
    this.callbacks = []
  }
  on(key, fn) {
    this.callbacks.push({
      key,
      fn,
      isOnce: false
    })
  }
  emit(key, ...args) {
    const executeFn = this.callbacks.find((item) => item.key === key)
    if (executeFn && typeof executeFn.fn === 'function') {
      executeFn.fn(...args)
      if (executeFn.isOnce) {
        this.off(key)
      }
    }
    return !!executeFn
  }
  off(key) {
    this.callbacks = this.callbacks.filter((item) => item.key !== key)
  }
  once(key, fn) {
    this.callbacks.push({
      key,
      fn,
      isOnce: true
    })
  }
}

/**
 * 使用
 * @author waldon
 * @date 2021-09-20
 */
const myPubSUb = new PubSub()
myPubSUb.once('getTest', (res1, res2) => {
  console.log(`res1`, res1)
  console.log(`res2`, res2)
})
myPubSUb.on('getTest2', (res1, res2) => {
  console.log(`res1`, res1)
  console.log(`res2`, res2)
})
setTimeout(() => {
  myPubSUb.emit('getTest', 's1', 's2')
  myPubSUb.emit('getTest', 's1', 's2')

  setTimeout(() => {
    myPubSUb.emit('getTest2', 's1', 's2')
  }, 1000)
}, 1000)
