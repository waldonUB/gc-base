const task1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 3000)
})
const task2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 500)
})
const task3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3)
  }, 6000)
})
const task4 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4)
  }, 5000)
})

function TaskController(count) {
  this.tasks = []
  this.count = count
  this.run = []
}
TaskController.prototype.add = function (task) {
  this.tasks.push(task)
  return this.next()
}
TaskController.prototype.next = function () {
  if (this.run.length < this.count) {
    const task = this.tasks.shift()
    const promise = task.then((res) => {
      this.run.splice(this.run.indexOf(promise), 1)
      return res
    })
    this.run.push(promise)
    return promise
  } else {
    return Promise.race(this.run).then(() => this.next())
  }
}
// todo waldon 输出顺序有问题
const taskController = new TaskController(2)
taskController.add(task1).then((res) => console.log(res))
taskController.add(task2).then((res) => console.log(res))
taskController.add(task3).then((res) => console.log(res))
taskController.add(task4).then((res) => console.log(res))

// 正确应该是 2 1 3 4
