var num = 1
function codequn() {
  'use strict'
  console.log('codequn: ', this.num++)
}
function codequn2() {
  console.log('codequn2: ', ++this.num)
}
;(function () {
  // 这里定义的严格模式在这个函数作用域下，不影响codequn2这个函数作用域
  'use strict'
  codequn2() // 输出2
})()
codequn() // 报错
