module.exports = function (src) {
  console.log(`loader中的src：`, src)
  src = src.replace(/waldon_test/gi, 'waldon_new')
  return src
}
