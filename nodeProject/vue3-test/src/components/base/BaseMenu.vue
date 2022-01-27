<template>
  <a-menu style="width: 256px" mode="inline">
    <SubMenu :menu-list="menuList" />
  </a-menu>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// components
import SubMenu from './SubMenu.vue'

/**
 * 公共变量定义
 * // todo waldon 看看后面有没有更简洁的方案
 * @author waldon
 * @date 2022-01-26
 */
const baseData = {
  router: null, // 路由
}

const operateMenu = () => {
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
  /**
   * 点击导航菜单
   * @author waldon
   * @date 2022-01-26
   * @param {Object} - rowData
   */
  const titleClick = (rowData) => {
    const _pushSubRouter = (_rowData) => {
      if (_rowData.children?.length) {
        _pushSubRouter(_rowData.children[0])
      } else {
        baseData.router.push({
          name: _rowData.id,
        })
      }
    }
    _pushSubRouter(rowData)

    // baseData.router.push({
    //   path: '/apiTest/setupScript',
    // })
  }
  return {
    menuList,
    titleClick,
  }
}

export default {
  name: 'BaseMenu',
  components: { SubMenu },
  emits: ['titleClick'],
  setup(props) {
    baseData.router = useRouter()
    const { menuList, titleClick } = operateMenu()

    const selectedKeys = ref(['1'])
    const openKeys = ref(['sub1'])
    const handleClick = (e) => {
      console.log(handleClick, e)
    }
    return {
      selectedKeys,
      openKeys,
      handleClick,
      titleClick,
      menuList,
    }
  },
}
</script>
