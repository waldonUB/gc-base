<template>
  <div class="cssVBind">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">CSS中的v-bind</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <a-button type="primary" class="list-btn" @click="getRandomValue"> 切换颜色 </a-button>
        </div>
      </div>
    </div>
    <div class="container-wrapper flex justify-center space-x-12">
      <div class="child">
        <p>style随机颜色</p>
        <div class="box" :style="randomColorCal">
          {{ randomColorCal }}
        </div>
      </div>
      <div class="child">
        <p>v-bind随机颜色</p>
        <div class="box v-bind">
          {{ randomColorCal }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
export default {
  setup() {
    const rColor = ref(0)
    const gColor = ref(0)
    const bColor = ref(0)
    const getRandomValue = function () {
      rColor.value = Math.floor(Math.random() * 225)
      gColor.value = Math.floor(Math.random() * 225)
      bColor.value = Math.floor(Math.random() * 225)
    }
    const randomColorCal = computed(
      () => `background-color: rgb(${rColor.value}, ${gColor.value}, ${bColor.value})`,
    )
    const randomColorVBindCal = computed(
      () => `rgb(${rColor.value}, ${gColor.value}, ${bColor.value})`,
    )
    return {
      bColor,
      getRandomValue,
      randomColorCal,
      randomColorVBindCal,
    }
  },
}
</script>
<style lang="less" scoped>
.cssVBind {
  .container-wrapper {
    .child {
      .box {
        width: 200px;
        height: 200px;
        border: 1px solid #eeeeee;
        &.v-bind {
          background-color: v-bind(randomColorVBindCal);
        }
      }
    }
  }
}
</style>
