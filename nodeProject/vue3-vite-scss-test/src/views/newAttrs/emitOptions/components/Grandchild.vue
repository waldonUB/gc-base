<!-- 孙子组件 -->
<template>
  <div class="grandchild">
    <p>组父组件的v-bind="$attrs"：{{ hobby }}</p>
    <p class="flex-wrapper deep-class">
      <span>孙子组件中的getRandomValue：{{ randomValue }}</span>
      <a-button type="primary" size="small" class="list-btn" @click="getRandomValue">
        获取随机值
      </a-button>
    </p>
  </div>
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
