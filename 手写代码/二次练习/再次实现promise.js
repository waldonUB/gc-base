// todo waldon 没完成
const MyPromise = function (execute) {
  this.callbacks = []
  this.state = 'ped'
  execute(this.resolve, this.reject)
}

MyPromise.prototype.resolve = function (resData) {
  let _resData = resData
  for (const item of this.callbacks) {
    const { successFn } = item
    _resData = successFn(_resData)
  }
}

MyPromise.prototype.reject = function (resData) {
  let _resData = resData
  for (const item of this.callbacks) {
    const { errorFn } = item
    _resData = errorFn(_resData)
  }
}

MyPromise.prototype.then = function (successFn, errorFn) {
  this.callbacks.push({
    successFn,
    errorFn,
  })
  return this
}
