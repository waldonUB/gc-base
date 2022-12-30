<script setup lang="ts">
import BaseMenu from '@/layouts/BaseMenu.vue'
</script>

<template>
  <div className="top-wrapper"></div>
  <div class="flex-wrapper">
    <BaseMenu />
    <div class="right-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
/* top start */
.top-wrapper {
  position: relative;
  z-index: 103;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 60px;
  min-width: 1040px;
  background: #ffffff;
  -webkit-box-shadow: 0 1px 6px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 10%);
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.flex-wrapper {
  display: flex;
  .right-wrapper {
    width: 100%;
  }
}
/* top end */
</style>
