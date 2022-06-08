import Vue from 'vue'
import VueRouter from 'vue-router'

// upload
import Upload from '@/routers/upload/index.vue'
import SingleUpload from '@/routers/upload/single/index.vue'
import MultipartUpload from '@/routers/upload/multipart/index.vue'

// crossPage
import CrossPage from '@/routers/crossPage/index.vue'
import PostMessage from '@/routers/crossPage/postMessage/index.vue'

// lazyLoad
import LazyLoad from '@/routers/lazyLoad/index.vue'

const routerList = [
  {
    path: '/',
    redirect: '/',
  },
  {
    name: 'lazyLoad',
    path: '/lazyLoad',
    component: LazyLoad,
  },
  {
    name: 'upload',
    path: '/upload',
    component: Upload,
    children: [
      {
        name: 'singleUpload',
        path: 'single',
        component: SingleUpload,
      },
      {
        name: 'multipartUpload',
        path: 'multipart',
        component: MultipartUpload,
      },
    ],
  },
  {
    name: 'crossPage',
    path: '/crossPage',
    component: CrossPage,
    children: [
      {
        name: 'postMessage',
        path: 'postMessage',
        component: PostMessage,
      },
    ],
  },
]

/**
 * 解决重复路由点击报错的问题
 * @author waldon
 * @date 2022-03-04
 * @param {*} location - param
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'hash',
  routes: routerList,
})
