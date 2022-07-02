/**
 * 经典继承
 * @author waldon
 * @date 2022-02-16
 */

const Father = function () {
  this.name = 'waldon'
}

const Child = function () {
  Father.call(this)
}
