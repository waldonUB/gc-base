const fn = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(111)
      resolve()
    }, 2000)
  })
}

const callbacks = []
callbacks.push(fn)
callbacks.push(fn)
callbacks.push(fn)
callbacks.push(fn)

async function show() {
  for (const fn of callbacks) {
    await fn()
  }
}
show()
