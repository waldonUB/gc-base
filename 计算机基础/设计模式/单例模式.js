let _instance
const _getInstance = function (params) {
  return {
    ...params,
    key: 'myInstance'
  }
}
class Singleton {
  constructor(params) {
    if (!_instance) {
      _instance = _getInstance(params)
    }
    // 构造函数必须返回一个对象，否则不生效
    // 返回一个指定的对象时，通常用来实现单例
    // https://www.30secondsofcode.org/articles/s/javascript-return-constructor
    return _instance
  }
}

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
