<script lang="ts">
import Child from './components/Child.vue'
export default {
  components: { Child },
  setup() {},
}
</script>
<template>
  <div class="fragment">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">片段</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <!-- <a-button type="primary" @click="showModal">显示对话框</a-button> -->
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <Child userName="waldon" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fragment {
}
</style>
