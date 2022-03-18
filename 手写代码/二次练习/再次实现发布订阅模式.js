const PubSub = function () {
  this.callbacks = []
}

PubSub.prototype.$on = function (name, fn) {
  this.callbacks.push({
    name,
    fn,
  })
}

PubSub.prototype.$emit = function (name, data) {
  const _callbacks = this.callbacks.filter((item) => item.name === name)
  for (const callback of _callbacks) {
    callback(data)
  }
}

PubSub.prototype.$off = function (name) {
  this.callbacks = this.callbacks.filter((item) => item.name !== name)
}
