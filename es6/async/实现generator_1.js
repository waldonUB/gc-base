// waldon 只实现了普通的next的功能，代码片段之类的没有能够去实现

const generatorWrapper = function (yieldList) {
  let _step = -1
  let _done = yieldList.length - 1 <= _step
  return {
    next: () => {
      _step++
      console.log(`yieldList`, yieldList)
      console.log(`_step`, _step)
      return {
        value: yieldList[_step] && yieldList[_step].value,
        done: _done,
      }
    },
  }
}
const _yieldList = []
const yieldWrapper = function (params) {
  _yieldList.push({
    value: params,
  })
}

const testFn = function () {
  yieldWrapper('hello')
  yieldWrapper('world')
}
testFn()
const generator = generatorWrapper(_yieldList)
console.log(`generator.next()`, generator.next())
console.log(`generator.next()`, generator.next())
