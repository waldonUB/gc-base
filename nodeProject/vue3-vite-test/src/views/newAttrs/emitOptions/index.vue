<script setup lang="ts">
// 这里顺便写穿透样式的用例
import Child from './components/Child.vue'
import { randomVal, getRandomValue, clickChild } from './config/index'
</script>
<template>
  <div class="compositionApi">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">触发组件选项</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <!-- <a-button type="primary" class="list-btn"> 录入订单 </a-button>
          <a-button type="primary" class="list-btn"> 同步订单 </a-button> -->
        </div>
      </div>
    </div>
    <div class="container-wrapper">
      <div class="page-wrapper">
        111
        <p class="title">父组件显示：</p>
        <p>父组件接收子组件的事件：{{ randomVal }}</p>
      </div>
      <div class="child-wrapper">
        <div class="left-part">
          <p class="title">子组件显示：</p>
          <!-- @get-random-value也可以正常使用 -->
          <Child
            userName="waldon"
            hobby="羽毛球"
            @getRandomValue="getRandomValue"
            @click="clickChild"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.compositionApi {
  .container-wrapper {
    .page-wrapper {
      width: 800px;
      height: 200px;
      border: 1px solid #eeeeee;
      box-sizing: border-box;
      padding: 20px;
      margin: 0 auto;
    }
    .child-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      :deep(.deep-class) {
        background-color: #eeeeee;
      }
    }
    .title {
      font-weight: bold;
    }
  }
}
</style>
