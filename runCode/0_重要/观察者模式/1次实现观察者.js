class Observer {
  constructor(options) {
    this.options = options
  }

  update(res) {
    // 执行监听的更新逻辑
    const { name } = this.options
    console.log(`${name}，执行监听逻辑`, res)
  }
}

class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  notify(params) {
    for (const observer of this.observers) {
      observer.update(params)
    }
  }
}

const observer1 = new Observer({ name: 'waldon' })
const observer2 = new Observer({ name: 'ak' })

const subject = new Subject()
const subject1 = new Subject()
subject.addObserver(observer1)
subject.addObserver(observer2)
subject.notify('参数')
subject1.addObserver(observer2)
subject1.notify('参数2')
