let count = 3
let obj = {
  a: 1
}
function incCount() {
  count++
  obj.a++
}

function showCount() {
  console.log('count: ' + count)
  console.log('obj.a: ' + obj.a)
}

module.exports = {
  count: count,
  incCount: incCount,
  showCount: showCount,
  obj: obj
}
