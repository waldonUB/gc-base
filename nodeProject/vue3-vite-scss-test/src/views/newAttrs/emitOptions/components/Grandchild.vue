<template>
  <!-- 渲染根组件 -->
  <router-view>
    <!-- 渲染子组件 -->
    <router-view>
      <!-- 渲染孙子组件 -->
      <router-view> </router-view>
    </router-view>
  </router-view>
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'Child',
  props: {
    hobby: {
      type: String,
      default: '',
    },
  },
  emits: ['randomValue'],
  setup(props: any, { emit }: any) {
    let randomValue = ref('')
    const getRandomValue = function () {
      randomValue.value = 'grandchild_$attrs_' + Math.random()
      emit('getRandomValue', randomValue.value)
    }
    return {
      randomValue,
      getRandomValue,
    }
  },
}
</script>
<style lang="scss" scoped>
.grandchild {
  width: 500px;
  height: 200px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 20px;
  .flex-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
