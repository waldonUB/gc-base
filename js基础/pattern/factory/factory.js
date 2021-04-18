class P {
  constructor() {}
  init() {
    console.log(`I am the init method：${this.name}`)
  }
}
class Div {
  constructor() {}
  init() {
    console.log(`I am the init method：${this.name}`)
  }
}
/** 用不到实例化的class直接用static关键字 */
class Factory {
  static create(type) {
    switch (type) {
      case 'div':
        return new Div()
      case 'p':
        return new P()
    }
  }
}
var product = Factory.create('div')
product.init()
