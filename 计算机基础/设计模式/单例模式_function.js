const Singleton = (function () {
  let _instance
  function _getInstance(params) {
    return {
      ...params,
      key: 'myInstance'
    }
  }
  return function (params) {
    if (!_instance) {
      _instance = _getInstance(params)
    }
    return _instance
  }
})()

const params1 = {
  name: 'num1'
}
const params2 = {
  name: 'num2'
}
const user1 = new Singleton(params1)
const user2 = new Singleton(params2)
console.log(`user1`, user1)
params1.name = 111 // 浅拷贝后不会生效
console.log(`user2`, user2)
console.log(user1 === user2)
