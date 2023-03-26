export abstract class Phone {
  /**
   * 打电话
   * @author xxx
   * @date 2023-03-13
   */
  call() {
    console.log('这是一个打电话的功能')
  }
  /**
   * 发信息的抽象方法
   * @author xxx
   * @date 2023-03-13
   */
  abstract message(): void
}
