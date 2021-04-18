function MyPromise(execute) {
  let state = 'pending'
  let callbacks = []
  if (typeof execute !== 'function') {
    throw new Error('execute必须为函数')
  }
  function resolve(value) {
    state = 'onfulfilled'
    setTimeout(function () {
      value = callbacks[0].onfulfilled(value)
      handler(value)
    }, 0)
  }
  function reject(value) {
    state = 'onrejected'
    setTimeout(function () {
      value = callbacks[0].onrejected(value)
      handler(value)
    }, 0)
  }
  function handler(value) {
    for (let i = 1; i < callbacks.length; i++) {
      value = callbacks[i].onfulfilled(value)
    }
  }
  this.then = function (onfulfilled, onrejected) {
    callbacks.push({ onfulfilled, onrejected })
    return this
  }
  execute(resolve, reject)
}

function f() {
  return new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      resolve(2)
    }, 0)
  })
}
f()
  .then(
    (result) => {
      console.log(`resolve:` + result)
      return result + 1
    },
    (result2) => {
      console.log(`reject:` + result2)
    }
  )
  .then((result) => {
    console.log(`第二次then：` + result)
  })
