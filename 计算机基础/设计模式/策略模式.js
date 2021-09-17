// waldon
// 策略模式其实就是将一系列的通用封装起来，在js里面表现为一个具有多个function的对象。
// 这个策略模式基本上我们一直都在用，比较常见的就是把一系列逻辑类型相近的function export出来，这其实就相当于一组策略
// es6后面的注解策略？
// 举例比如常见的表单校验，最小值，最大值，非空判断
// 还有vue源码中的判断各种详细的类型，isNumber，isString，isObject
var STRATEGY_NAME = {
  isNotEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  // 限制最小长度
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  // 手机号码格式
  mobileFormat: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg
    }
  }
}
