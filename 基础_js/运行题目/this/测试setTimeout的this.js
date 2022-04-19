// todo waldon 看一下setTimeout里面的this是不是始终指向全局
const obj = {
  a: 1,
  b: () => {
    setTimeout(() => {
      console.log('a: ', this.a)
    })
  },
}
obj.b()
