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
    id: 'testGroup',
    icon: '',
    name: '测试组',
    children: [
      {
        id: 'apiTest',
        icon: '',
        name: 'api测试',
        children: [
          {
            id: 'setupScript',
            icon: '',
            name: 'setupScript',
          },
          {
            id: 'setupNormal',
            icon: '',
            name: 'setupNormal',
          },
        ],
      },
    ],
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

<style lang="scss" scoped>
.menu-wrapper {
  width: 300px;
  height: 100%;
}
</style>
