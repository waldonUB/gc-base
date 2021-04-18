class Adaptee {
    specificRequest() {
        return '我是被转换着'
    }
}
class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }
    request() {
        let adaptee1 = this.adaptee.specificRequest()
        console.log(`${adaptee1} 被转换成 标准的`)
    }
}
