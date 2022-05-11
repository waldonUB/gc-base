/*
这个是vue的写法
dep是Dependency的意思
当依赖发生改变的时候，会去notify通知观察者
一个依赖（对象）可能会对应多个观察者
*/

const Dep = function () {
  this.callbacks = []
}
Dep.prototype.add = function (watcher) {
  this.callbacks.push(watcher)
}
Dep.prototype.notify = function () {
  for (const watcher of this.callbacks) {
    watcher.update()
  }
}
Dep.prototype.del = function (watcherName) {
  this.callbacks = this.callbacks.filter((item) => item.name !== watcherName)
}

const Watcher = function (name) {
  this.name = name
}
Watcher.prototype.update = function () {
  console.log('执行更新操作: ', this.name)
}

const dep = new Dep()
const watcher1 = new Watcher('waldon')
const watcher2 = new Watcher('waldon2')

dep.add(watcher1)
dep.add(watcher2)

dep.notify()
