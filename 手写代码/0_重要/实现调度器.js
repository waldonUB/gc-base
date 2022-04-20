// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。
// 完善代码中Scheduler类，
// 使得以下程序能正确输出
// https://github.com/Yuanyuanyuanc/aYuan-learning-notes/issues/2 解析

class Scheduler {
  constructor() {
    this.count = 2
    this.queue = []
    this.run = []
  }

  async add(task) {
    this.queue.push(task)
    return this.next(task)
  }
  next() {
    if (this.run.length < this.count && this.queue.length) {
      const fn = this.queue.shift()
      const promise = fn().then(() => {
        this.run.splice(this.run.indexOf(promise), 1)
      })
      this.run.push(promise)
      return promise
    } else {
      return Promise.race(this.run).then(() => {
        return this.next()
      })
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(4000, '4')
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
