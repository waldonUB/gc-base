<script lang="ts">
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue'

// api
import { toRefs } from 'vue'
import { useRouter, createRouter } from 'vue-router'
export default {
  components: {
    MailOutlined,
    PieChartOutlined,
  },
  setup(props: any, context: any) {},
}
</script>
<template>
  <div class="compositionApi">
    <div className="page-header">
      <div className="left-part">
        <div className="page-title">订单列表</div>
      </div>
      <div className="right-part">
        <div className="button-operate">
          <a-button type="primary" class="list-btn"> 录入订单 </a-button>
          <a-button type="primary" class="list-btn"> 同步订单 </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
