/**
 * 组合继承
 * @author waldon
 * @date 2022-02-16
 */

const Father = function () {
  this.name = 'waldon'
}
const Son = function () {
  Father.call(this)
}
Son.prototype = new Father()
