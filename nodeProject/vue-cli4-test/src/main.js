import Vue from 'vue'
import App from './App.vue'
import { router } from './config/routerConfig'
import directives from '@/directives/index'
console.log('directives', directives)

Vue.config.productionTip = false

// 错误监控相关测试
// https://juejin.cn/post/6987681953424080926 超棒的文章

Vue.config.errorHandler = function (err, vm, info) {
  console.log('vue errorHandler err: ', err)
  console.log('vue errorHandler vm: ', vm)
  console.log('vue errorHandler info: ', info)
}
// window.onerror = function (err, vm, info) {
//   console.log('window onerror err: ', err)
//   console.log('window onerror vm: ', vm)
//   console.log('window onerror info: ', info)
// }
// window.error = function (err, vm, info) {
//   console.log('window error err: ', err)
//   console.log('window error vm: ', vm)
//   console.log('window error info: ', info)
// }

// window.addEventListener('error', function (err, vm, info) {
//   console.log('addEventListener error err: ', err)
//   console.log('addEventListener error vm: ', vm)
//   console.log('addEventListener error info: ', info)
// })
for (const key in directives) {
  Vue.directive(key, directives[key])
}

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
