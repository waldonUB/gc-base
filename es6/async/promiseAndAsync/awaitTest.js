function promise() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve('promise init')
    }, 1000)
  })
}

let fn = (function () {
  let init
  return async function () {
    if (!init) {
      init = await promise()
      return init
    } else {
      return init
    }
  }
})()

fn().then((res) => {
  console.log(`res` + res)
})

console.log(fn())
setTimeout(function () {
  console.log(fn())
}, 1500)
