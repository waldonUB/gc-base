<template>
  <div class="child" v-bind="$attrs">根节点1</div>
  <div class="child">根节点2</div>
</template>
<script lang="ts">
export default {
  name: 'Child',
  setup() {},
}
</script>
<style lang="scss" scoped>
.child {
}
</style>
