import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "./store/index.js"
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.bus = new Vue()
Vue.prototype.store = {
    store: 'test'
}

// Vue.observable可以用这种方式来实现，共享的属性一般加$来区分
// Vue.prototype.$store = store

new Vue({
    el: '#app',
    data() {
        return {
            root: '根实例',
            test: ''
        }
    },
    router,
    store,
    components: {
        App
    },
    template: '<App></App>'
})
