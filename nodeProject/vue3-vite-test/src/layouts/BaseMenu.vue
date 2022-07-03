<template>
  <a-menu class="menu-wrapper" mode="inline">
    <SubMenu :menu-list="menuList" @titleClick="titleClick" />
  </a-menu>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter, createRouter } from 'vue-router'
// components
import SubMenu from './SubMenu.vue'

const menuList = [
  {
    id: 'home',
    icon: '',
    name: '首页',
    children: [],
  },
  {
    id: 'newAttrs',
    icon: '',
    name: 'Vue3新特性',
    children: [
      {
        id: 'compositionApi',
        icon: '',
        name: '组合式API',
      },
      {
        id: 'teleport',
        icon: '',
        name: 'Teleport',
      },
      {
        id: 'fragment',
        icon: '',
        name: '片段',
      },
      {
        id: 'emitOptions',
        icon: '',
        name: '触发组件选项',
      },
      {
        id: 'cssVBind',
        icon: '',
        name: 'CSS中的v-bind',
      },
      {
        id: 'lifeCycle',
        icon: '',
        name: '组件生命周期',
      },
      {
        id: 'hooksTest',
        icon: '',
        name: 'Hooks测试',
      },
    ],
  },
  {
    id: 'globalApi ',
    icon: '',
    name: '全局Api',
    children: [
      {
        id: 'globalInstanceApi',
        icon: '',
        name: '全局API改为应用实例',
      },
    ],
  },
  {
    id: 'templateDirective',
    icon: '',
    name: '模板指令',
    children: [
      {
        id: 'vModelChange',
        icon: '',
        name: 'v-model用法更改',
      },
      {
        id: 'vForAndVIf',
        icon: '',
        name: 'v-for和v-if用法',
      },
    ],
  },
  {
    id: 'component ',
    icon: '',
    name: '组件',
    children: [],
  },
  {
    id: 'renderFunction ',
    icon: '',
    name: '渲染函数',
    children: [],
  },
  {
    id: 'otherChange ',
    icon: '',
    name: '其他小改变',
    children: [],
  },
  {
    id: 'removedApi ',
    icon: '',
    name: '被移除的API',
    children: [],
  },
]

export default {
  name: 'BaseMenu',
  components: { SubMenu },
  data() {
    return {
      menuList,
      baseData: {
        router: null, // 路由
      },
    }
  },
  computed: {
    openMenuIdsCal() {
      const res = []
      this.menuList.forEach((item) => {
        if (item?.children.length) {
          res.push(item.children[0].id)
        }
      })
      console.log('res: ', res)
      return res
    },
  },
  methods: {
    /**
     * 点击路由
     * @author waldon
     * @date 2022-01-29
     * @param {*} rowData - param
     */
    titleClick(rowData) {
      console.log('parent component success')
      return
      // if (!baseData.router) {
      //   baseData.router = useRouter()
      // }
      // const _pushSubRouter = (_rowData) => {
      //   if (_rowData.children?.length) {
      //     _pushSubRouter(_rowData.children[0])
      //   } else {
      //     baseData.router.push({
      //       name: _rowData.id,
      //     })
      //   }
      // }
      // _pushSubRouter(rowData)
    },
  },
  created() {
    this.baseData.router = useRouter()
  },
}
</script>

<style lang="less" scoped>
.menu-wrapper {
  width: 300px;
  height: 100%;
}
</style>
