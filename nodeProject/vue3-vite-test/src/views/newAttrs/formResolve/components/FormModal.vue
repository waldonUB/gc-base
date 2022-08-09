<script setup lang="ts">
import { toRefs, reactive, watchEffect } from 'vue'

/* 声明 start */
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  formType: {
    type: String,
    default: '',
  },
  curRowData: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:visible', 'saveSuccess'])

const getFormState = () => {
  return {
    username: '',
    password: '',
    address: '',
  }
}
const formStateReactive = reactive(getFormState())
// 在父组件使用ref的值，在子组件中需使用toRef来对props进行解构，保持响应式
const { visible, formType } = toRefs(props)
// 普通对象或者是proxy对象则直接解构即可
const { curRowData } = props
/* 声明 end */

// 当对话框显示时，且状态为【编辑】，则合并传过来的对象
watchEffect(() => {
  if (visible.value) {
    if (formType.value === 'edit') {
      Object.assign(formStateReactive, curRowData)
    }
  }
})

/**
 * 重置表单
 * 这里只是演示一下重置对象的用法而已
 * 项目中一般重置表单还是会使用Form自带的reset
 * @author waldon
 * @date 2022-08-09
 */
const resetForm = () => {
  Object.assign(formStateReactive, getFormState())
}

const handleOk = (e: MouseEvent) => {
  emits('update:visible', false)
}
const handleCancel = (e: MouseEvent) => {
  emits('update:visible', false)
}
</script>
<template>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
    <a-form
      :model="formStateReactive"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formStateReactive.username" />
      </a-form-item>
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formStateReactive.password" />
      </a-form-item>
      <a-form-item
        label="Address"
        name="address"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input v-model:value="formStateReactive.address" />
      </a-form-item>
      <p class="form-line">
        <a-button class="reset-btn" @click="resetForm">重置</a-button>
      </p>
    </a-form>
  </a-modal>
</template>
<style>
.form-line {
  display: flex;
}
.reset-btn {
  margin-left: auto;
}
</style>
