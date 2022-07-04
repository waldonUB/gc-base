<!-- 子组件 -->
<template>
  <div class="child" @click="getChildClick">
    <div class="left-part">
      <p>父组件的props：{{ userName }}</p>
      <p class="flex-wrapper">
        <span>子组件中的getRandomValue：{{ randomValue }}</span>
        <a-button type="primary" size="small" class="list-btn" @click="getRandomValue">
          获取随机值
        </a-button>
      </p>
    </div>
    <div class="right-part">
      <p class="title">孙子组件显示：</p>
      <Grandchild v-bind="$attrs" />
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import Grandchild from './Grandchild.vue'
export default {
  name: 'Child',
  components: {
    Grandchild,
  },
  props: {
    userName: {
      type: String,
      default: '',
    },
  },
  emits: ['randomValue', 'click'],
  setup(props: any, { emit }: any) {
    let randomValue = ref('')
    const getRandomValue = function () {
      randomValue.value = 'child_' + Math.random()
      emit('getRandomValue', randomValue.value)
    }
    const getChildClick = function () {
      emit('click', 'child')
    }
    return {
      randomValue,
      getRandomValue,
      getChildClick,
    }
  },
}
</script>
<style lang="less" scoped>
.child {
  width: 800px;
  height: 400px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  padding: 20px;
  .flex-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .right-part {
    .title {
      font-weight: bold;
    }
  }
}
</style>
