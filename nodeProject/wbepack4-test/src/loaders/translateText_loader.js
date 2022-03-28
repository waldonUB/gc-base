module.exports = function (src) {
  console.log(`执行自定义loader`)
  src = src.replace(/waldon_test/gi, 'waldon_new')
  return src
}
