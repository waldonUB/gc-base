// waldon:
// 讲原型链的时候可以顺带讲出，带$符号一般作为默认规范。
// 比如vue中非父子组件通信可能会用到的总线机制，
// 还有Vue的一些插件，比如vuex和饿了么UI。
// 其实都有用到一些全局的api挂载到Vue的原型链上，例如饿了么UI中的一些全局的提示和弹窗，vuex中的commit和dispatch方法

// 测试：
function User() {}
User.prototype.getUserName = function () {
  console.log(`getUserName 执行`)
}

const user = new User()
user.getUserName()
