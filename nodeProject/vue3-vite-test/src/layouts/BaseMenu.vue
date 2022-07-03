<script>
import { defineComponent, ref, watch } from 'vue'

// components
import SubMenu from './SubMenu.vue'

// utils
import { routes as menuList } from '@/routers/index.ts'

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
  created() {},
}
</script>

<template>
  <a-menu class="menu-wrapper" mode="inline">
    <SubMenu :menu-list="menuList" @titleClick="titleClick" />
  </a-menu>
</template>

<style lang="less" scoped>
.menu-wrapper {
  width: 300px;
  height: 100%;
}
</style>
