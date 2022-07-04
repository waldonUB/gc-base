<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup(props: any) {
    // 也可以用reactive({ list: [] })这个方式来改变数组
    let initArr: any = ref([1, 2, 3])
    const delArrItem = function () {
      initArr.value[0] = 8
    }
    const replaceArr = function () {
      initArr.value = [4, 5, 6]
    }
    return {
      initArr,
      delArrItem,
      replaceArr,
    }
  },
}
</script>
<template>
  <div class="arr-watch">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">数组监听</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <a-button type="primary" class="list-btn" @click="delArrItem">替换某一项</a-button>
          <a-button type="primary" class="list-btn" @click="replaceArr">替换整个数组</a-button>
        </div>
      </div>
    </div>
    <div class="container-wrapper">当前数组：{{ JSON.stringify(initArr) }}</div>
  </div>
</template>
<style lang="less" scoped>
.arr-watch {
}
</style>
