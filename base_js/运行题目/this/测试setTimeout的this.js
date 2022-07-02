/*
setTimeout的指向都是window，因为setTimeout是在window上调用的，所以this指向window。
可以通过三种方式来改变this的指向：
1. 闭包
2. bind
3. setTimeout传参

*/
const obj = {
  a: 1,
  b: () => {
    setTimeout(() => {
      console.log('a: ', this.a)
    })
  },
}
obj.b()
