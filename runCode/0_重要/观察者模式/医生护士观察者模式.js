class Observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(`${this.name}开始工作了`)
  }
}

class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  notify() {
    console.log(`张三出现问题了`)
    for (const item of this.observers) {
      item.update()
    }
  }
}

const observer1 = new Observer('医生')
const observer2 = new Observer('护士')

const subject = new Subject()
subject.addObserver(observer1)
subject.addObserver(observer2)
subject.notify()
