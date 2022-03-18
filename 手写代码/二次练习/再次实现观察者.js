const Dep = function () {
  this.subs = []
}

Dep.prototype.addDep = function (watcher) {
  this.subs.push(watcher)
}

Dep.prototype.removeDep = function (watcher) {
  this.subs = this.subs.filter((item) => item.id !== watcher.id)
}

Dep.prototype.notify = function () {
  for (const item of this.subs) {
    item.update()
  }
}

const Watcher = function () {
  this.id = Symbol()
}

Watcher.prototype.update = function () {
  console.log('更新了')
}

const dep = new Dep()

const watcher1 = new Watcher()
const watcher2 = new Watcher()

dep.addDep(watcher1)
dep.addDep(watcher2)

dep.notify()
