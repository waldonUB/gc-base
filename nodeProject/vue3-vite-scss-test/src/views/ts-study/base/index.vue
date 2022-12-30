<script setup lang="ts">
const getItself = <T>(value: T): T => {
  return value
}
type double = string | number

const getStringOrNumber = <T extends double>(value: T): T => {
  return value
}

getStringOrNumber(6)
</script>
<template>
  <div className="page-header">
    <div className="left-part">
      <div className="page-title">ts基础特性</div>
    </div>
    <div className="right-part">
      <div className="button-operate"></div>
    </div>
  </div>
  <div class="container-wrapper"></div>
</template>
<style lang="scss" scoped>
.ts-base {
}
</style>
