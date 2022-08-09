<script setup lang="ts">
import { ref } from 'vue'
import FormModal from './components/FormModal.vue'

const visible = ref(false)
const formType = ref('')
const curRowData = {
  username: 'waldon',
  password: '123456',
  address: '随便哪个位置都行',
}

/**
 * 显示表单
 * @author waldon
 * @date 2022-08-09
 * @param {*} type - param
 */
const showModal = (type: string) => {
  formType.value = type
  visible.value = true
}
</script>
<template>
  <div class="form-resolve">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">form表单组件传值</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <a-button type="primary" class="list-btn" @click="showModal('add')"> 新增表单 </a-button>
          <a-button type="primary" class="list-btn" @click="showModal('edit')"> 编辑表单 </a-button>
        </div>
      </div>
    </div>
    <div class="container-wrapper"></div>
    <FormModal v-model:visible="visible" :formType="formType" :curRowData="curRowData" />
  </div>
</template>
<style lang="less" scoped></style>
