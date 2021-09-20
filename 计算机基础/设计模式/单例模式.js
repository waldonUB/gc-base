let _instance
// todo waldon 单例的实现再看看标准的
class App {
  static getInstance(appId) {
    debugger
    if (_instance) {
      return _instance
    } else {
      return {
        appId,
        setAppId: function (appId) {
          this.appId = appId
        },
        getAppId: function () {
          return this.appId
        }
      }
    }
  }
}
const instance = App.getInstance('123')
console.log(`getAppId`, instance.getAppId())
instance.setAppId('456')
console.log(`getAppId`, instance.getAppId())
