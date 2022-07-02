function fn1() {
  for (var i = 0; i < 4; i++) {
    var tc = setTimeout(
      function (i) {
        console.log(i)
        console.log(`tc`, tc)
        clearTimeout(tc)
      },
      10,
      i
    )
  }
}
function fn2() {
  for (var i = 0; i < 4; i++) {
    var tc = setInterval(
      function (i, tc) {
        console.log(i)
        clearInterval(tc)
      },
      10,
      i,
      tc
    )
  }
}
fn1()
fn2()
