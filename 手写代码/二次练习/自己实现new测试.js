const myNew = function (fn, ...args) {
  if (typeof fn !== 'function') {
    throw Error('非构造函数')
  }
  const _prototype = Object.create(fn.prototype)
  const _instance = fn.apply(_prototype, args)
  if (['object', 'function'].includes(typeof _instance)) {
    return _instance
  }
  return _prototype
}
// const notFn = ''
// const f = myNew(notFn) // 测试成功

const testFn = function () {
  return function () {
    console.log(1)
  }
}
const testInstance = myNew(testFn) // 测试成功

// const testInstance = new testFn()
testInstance()
