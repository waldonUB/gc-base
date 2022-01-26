<template>
  <div class="content-wrapper">
    <BaseMenu />
    <div class="right-part">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BaseMenu from '@/components/base/BaseMenu.vue'
export default {
  name: 'AppHome',
  components: { BaseMenu },
  setup(props) {
    console.log(props)
    const toSubPage = () => {
      console.log(111)
    }

    return {
      toSubPage,
    }
  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-flow: row nowrap;
  .right-part {
    flex: 1;
  }
}
</style>
