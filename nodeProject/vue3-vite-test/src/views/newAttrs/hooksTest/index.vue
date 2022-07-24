<script lang="ts">
import { ref, reactive, toRef, toRefs } from 'vue'
export default {
  setup(props: any) {
    // 也可以用reactive({ list: [] })这个方式来改变数组
    let formObj = reactive({
      name: 'waldon',
      age: 18,
    })
    let formRefs = toRefs(formObj)
    let formRef = ref(formObj)
    const replaceObj = () => {
      // Object.assign(formObj, {
      //   name: Math.random() + '',
      //   age: Math.random() + '',
      // })
      formRef.value = {
        name: Math.random() + '',
        age: Math.random(),
      }
    }
    const replaceAttr = () => {
      formObj.name = Math.random() + ''
    }
    return {
      formObj,
      replaceObj,
      replaceAttr,
    }
  },
}
</script>
<template>
  <div class="hooks-test">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">hooksTest</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <!-- <a-button type="primary" class="list-btn" @click="delArrItem">替换某一项</a-button>
          <a-button type="primary" class="list-btn" @click="replaceArr">替换整个数组</a-button> -->
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <a-button type="primary" class="list-btn" @click="replaceObj">改变当前对象</a-button>
      <a-button type="primary" class="list-btn" @click="replaceAttr">改变单个属性</a-button>
      <p>当前对象：{{ JSON.stringify(formObj) }}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.hooks-test {
  .list-btn {
    margin-right: 10px;
  }
}
</style>
