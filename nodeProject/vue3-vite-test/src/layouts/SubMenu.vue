<template>
  <template v-for="item in menuList" :key="item.id">
    <a-sub-menu
      v-if="item.children?.length"
      :openKeys="['compositionApi']"
      :selectedKeys="['home']"
      @titleClick="titleClick(item)"
    >
      <template #icon>
        <MailOutlined />
      </template>
      <template #title>{{ item.name }}</template>
      <SubMenu :menu-list="item.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.id" @click="titleClick(item)">
      <template #icon>
        <PieChartOutlined />
      </template>
      {{ item.name }}
    </a-menu-item>
  </template>
</template>
<script lang="ts">
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue'

import { toRefs } from 'vue'
export default {
  name: 'SubMenu',
  inheritAttrs: false,
  components: {
    MailOutlined,
    PieChartOutlined,
  },
  props: {
    menuList: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
  },
  setup(props: any, context: any) {
    const { emit } = context
    const { menuList } = toRefs(props)
    console.log('menuList', menuList)
    const titleClick = (rowData: any) => {
      console.log('点击了里面')
      emit('titleClick', rowData)
    }
    return {
      titleClick,
    }
  },
}
</script>
<style lang="less" scoped></style>
