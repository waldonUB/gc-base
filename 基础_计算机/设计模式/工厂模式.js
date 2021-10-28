// waldon
// 一般存在new对象时，就可以考虑到工厂模式。
// 工厂模式的本质是return一个实例，这个实例存在比较多的相同的东西，我们只需要传差异化的入参去创建即可，而无需关注他创建的过程
// 如vue中的Vue.component('xxx', {})或者说Vue.extend({})
// todo waldon 这里找一下Vue.component的实现
// 应用：vue中的路由根据不同的角色返回不同的权限路由。

class RoleFactory {
  constructor({ name = '', position = '' }) {
    this.name = name
    this.position = position
  }
  static createRole(role) {
    switch (role) {
      case 'admin':
        return new RoleFactory({ name: 'xxx', position: 'admin' })
      case 'staff':
        return new RoleFactory({ name: 'xxx', position: 'staff' })
    }
  }
}

const staff1 = RoleFactory.createRole('admin')
console.log(staff1)
