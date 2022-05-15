Object.prototype.myCreate = function (source) {
  const obj = {}
  obj.__proto__ = source
  return obj
}
