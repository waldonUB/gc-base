var a = 0
;(function () {
  a = 4
  f().then((res) => {
    a = 8
    console.log(a)
  })
  a = 5
  console.log(a)
})()
function f() {
  return new Promise((resolve) => {
    a = 6
    resolve()
  })
}
