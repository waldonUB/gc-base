import Vue from "vue"
import Router from "vue-router"
import Home from "../pages/Home.vue"
import TestHome from "../../test/home/TestHome.vue"
import TestDeep from "../../test/home/TestDeep.vue"

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/test',
        name: 'TestHome',
        component: TestHome
    },{
        path: '/deep',
        name: 'TestDeep',
        component: TestDeep
    }]
})
