import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.bus = new Vue()
Vue.prototype.store = {
    store: 'test'
}

new Vue({
    el: '#app',
    data() {
        return {
            root: '根实例'
        }
    },
    router,
    components: {
        App
    },
    template: '<App></App>'
})
