import Vue from "vue"
import Router from "vue-router"
import Home from "../pages/Home.vue"
import TestHome from "../../test/home/TestHome.vue"
import TestDeep from "../../test/home/TestDeep.vue"
import VON from "../../test/components/EventBus/VON.vue"
import VON2 from "../../test/components/EventBus/VON2.vue"
import TestObserver from "../../test/home/TestObserver.vue"
import TestCorrespond from "../../test/home/TestCorrespond.vue"
import VuexTest from "../../test/home/VuexTest.vue"
import RenderTest from "../../test/home/RenderTest.vue"

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
    },{
        path: '/VON',
        name: 'VON',
        component: VON
    },{
        path: '/VON2',
        name: 'VON2',
        component: VON2
    },{
        path: '/testObserver',
        name: 'testObserver',
        component: TestObserver
    },{
        path: '/testCorrespond',
        name: 'TestCorrespond',
        component: TestCorrespond
    },{
        path: '/vuexTest',
        name: 'VuexTest',
        component: VuexTest
    },{
        path: '/renderTest',
        name: 'RenderTest',
        component: RenderTest
    }]
})
