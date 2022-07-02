const obj = {
  a: 1
}
function showTest(instance) {
  console.log(this.a)
  console.log(arguments)
}

let bindInstance = showTest.bind(obj, 'ppp1', 'ppp2')
debugger
console.log(bindInstance instanceof Function)
bindInstance('ppp3')
