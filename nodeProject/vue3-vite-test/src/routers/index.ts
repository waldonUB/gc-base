import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    id: 'home',
    path: '/',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '首页',
    children: [],
  },
  {
    id: 'newAttrs',
    path: '/newAttrs',
    component: () => import('@/layouts/SubRouterView.vue'),
    icon: '',
    name: 'Vue3新特性',
    children: [
      {
        id: 'compositionApi',
        path: '/newAttrs/compositionApi',
        component: () => import('@/views/newAttrs/compositionApi/index.vue'),
        icon: '',
        name: '组合式API',
      },
      {
        id: 'teleport',
        path: '/newAttrs/teleport',
        component: () => import('@/views/newAttrs/teleport/index.vue'),
        icon: '',
        name: 'Teleport',
      },
      {
        id: 'fragment',
        path: '/newAttrs/fragment',
        component: () => import('@/views/newAttrs/fragment/index.vue'),
        icon: '',
        name: '片段',
      },
      {
        id: 'emitOptions',
        path: '/newAttrs/emitOptions',
        component: () => import('@/views/newAttrs/emitOptions/index.vue'),
        icon: '',
        name: '触发组件选项',
      },
      {
        id: 'cssVBind',
        path: '/newAttrs/cssVBind',
        component: () => import('@/views/newAttrs/cssVBind/index.vue'),
        icon: '',
        name: 'CSS中的v-bind',
      },
      {
        id: 'arrWatch',
        path: '/newAttrs/arrWatch',
        component: () => import('@/views/newAttrs/arrWatch/index.vue'),
        icon: '',
        name: '数组监听',
      },
      {
        id: 'lifeCycle',
        path: '/newAttrs/lifeCycle',
        component: () => import('@/views/newAttrs/lifeCycle/index.vue'),
        icon: '',
        name: '组件生命周期',
      },
      {
        id: 'hooksTest',
        path: '/newAttrs/hooksTest',
        component: () => import('@/views/newAttrs/hooksTest/index.vue'),
        icon: '',
        name: 'Hooks测试',
      },
    ],
  },
  {
    id: 'templateDirective',
    path: '/templateDirective',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '模板指令',
    children: [
      {
        id: 'vModelChange',
        path: '/templateDirective/vModelChange',
        component: () => import('@/views/templateDirective/vModelChange/index.vue'),
        icon: '',
        name: 'v-model用法更改',
      },
      {
        id: 'vForAndVIf',
        path: 'compositionApi',
        component: () => import('@/views/dashboard/index.vue'),
        icon: '',
        name: 'v-for和v-if用法',
      },
    ],
  },
  {
    id: 'globalApi ',
    path: '/globalApi',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '全局Api',
    children: [
      {
        id: 'globalInstanceApi',
        path: 'compositionApi',
        component: () => import('@/views/dashboard/index.vue'),
        icon: '',
        name: '全局API改为应用实例',
      },
    ],
  },
  {
    id: 'component ',
    path: '/component',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '组件',
    children: [],
  },
  {
    id: 'renderFunction ',
    path: '/renderFunction',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '渲染函数',
    children: [],
  },
  {
    id: 'otherChange ',
    path: '/otherChange',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '其他小改变',
    children: [],
  },
  {
    id: 'removedApi ',
    path: '/removedApi',
    component: () => import('@/views/dashboard/index.vue'),
    icon: '',
    name: '被移除的API',
    children: [],
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export { routes, router }
