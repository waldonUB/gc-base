const myCreate = function (target, props) {
  const Fn = function () {}
  Fn.prototype = target
  if (props) {
    Object.defineProperties(Fn.prototype, props)
  }
  return new Fn()
}
