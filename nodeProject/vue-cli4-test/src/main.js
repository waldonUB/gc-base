import Vue from 'vue'
import App from './App.vue'
import { router } from './config/routerConfig'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
