const a = 6

const b = {
  child: {
    x: 3,
  },
}

const fn = function () {
  console.log('a：' + this.a)
  console.log('this：', this.a)
}

module.exports = {
  a,
  b,
  fn,
}
