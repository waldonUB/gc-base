<script lang="ts">
import { ref } from 'vue'
export default {
  setup(props: any) {
    const isShow = ref(false)
    const showModal = function () {
      isShow.value = true
    }
    return {
      isShow,
      showModal,
    }
  },
}
</script>
<template>
  <div class="teleport">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">Teleport</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <a-button type="primary" @click="showModal">显示对话框</a-button>
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <teleport v-if="isShow" to="body">
        <div class="modal-body">这是一个挂载在body上的元素</div>
      </teleport>
    </div>
  </div>
</template>
<style lang="less" scoped>
.teleport {
}
.modal-body {
  width: 300px;
  height: 100px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #333333;
}
</style>
