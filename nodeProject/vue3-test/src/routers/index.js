// todo waldon 这里可以拿到目录自动遍历路由
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/AppHome.vue'),
    children: [
      {
        path: 'apiTest/setupScript',
        component: () => import('@/views/apiTest/setupScript/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export { router }
