/**
 * 自己实现基本的思路
 * @author waldon
 * @date 2022-02-28
 */
class MyPubSub {
  constructor() {
    this.callbacks = []
  }

  on(name, fn) {
    this.callbacks.push({
      name,
      fn,
    })
  }

  emit(name, params) {
    const current = this.callbacks.find((item) => item.name === name)
    if (current) {
      current.fn.call(this, params)
    }
  }

  off(name) {
    this.callbacks = this.callbacks.filter((item) => item.name !== name)
  }
}

const pubSub = new MyPubSub()

pubSub.on('hello', (name) => {
  console.log('hello, ', name)
})

pubSub.emit('hello', 'waldon')

pubSub.emit('hello', 'ak')

pubSub.off('hello')

pubSub.emit('hello', 'waldon')
