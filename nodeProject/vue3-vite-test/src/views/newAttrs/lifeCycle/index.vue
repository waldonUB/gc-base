<script lang="ts">
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue'

// api
import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import { useRouter, createRouter } from 'vue-router'
export default {
  components: {
    MailOutlined,
    PieChartOutlined,
  },
  setup(props: any, context: any) {
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
  },
}
</script>
<template>
  <div class="compositionApi">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">组件生命周期</div>
      </div>
      <div className="right-part">
        <div className="button-operate"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
