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
import DestroyTest from "../../test/home/DestroyTest.vue"
import RefTest from "../../test/home/RefTest.vue"
import DialogTest from "../../test/home/DialogTest.vue"
import PopoverTest from "../../test/home/PopoverTest.vue"
import SimpleDialogTest from "../../test/home/SimpleDialogTest.vue"
import DynamicRouter from "../../test/components/dynamicRouter/DynamicRouter.vue"
import DynamicRouterTest from "../../test/home/DynamicRouterTest.vue"

Vue.use(Router)

export let router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/test',
        name: 'TestHome',
        component: TestHome,
        // beforeEnter: (to, from, next) => {
        //     debugger
        //     console.log('to:' + to)
        //     console.log('from:' + from)
        //     next()
        // }

    },{
        path: '/deep',
        name: 'TestDeep',
        component: TestDeep,
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
    },{
        path: '/destroyTest',
        name: 'DestroyTest',
        component: DestroyTest
    },{
        path: '/refTest',
        name: 'refTest',
        component: RefTest
    },{
        path: '/dialogTest',
        name: 'DialogTest',
        component: DialogTest
    },{
        path: '/popoverTest',
        name: 'PopoverTest',
        component: PopoverTest
    },{
        path: '/simpleDialogTest',
        name: 'SimpleDialogTest',
        component: SimpleDialogTest
    },{
        path: '/dynamicRouter/:name',
        name: 'DynamicRouter',
        component: DynamicRouter
    },{
        path: '/dynamicRouterTest',
        name: 'DynamicRouterTest',
        component: DynamicRouterTest
    }]
})

// router.beforeEach((to, from, next) => {
//     next()
//     // if (to.fullPath !== "/test") {
//     //     next('/test')
//     // } else {
//     //     next()
//     // }
// })
