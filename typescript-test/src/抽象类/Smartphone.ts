import { Phone } from './Phone'
class Smartphone extends Phone {
  message(): void {
    console.log('智能手机专用的发信息方法')
  }
}
const smartphone = new Smartphone()
smartphone.call()
smartphone.message()
// 依次打印
// 这是一个打电话的功能
// 智能手机专用的发信息方法
