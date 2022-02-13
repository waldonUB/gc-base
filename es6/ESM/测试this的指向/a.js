export const a = 6

export const fn = function () {
  console.log('this：', this)
  console.log('a：' + this.a)
}

export default {
  a,
  fn,
}
