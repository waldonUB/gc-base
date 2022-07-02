function Father() {
  this.name = 'waldon'
}
function Son() {
  Father.call(this)
  this.age = '18'
}
Son.prototype = Father.prototype
