<script lang="ts">
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue'
import SVGA from 'svgaplayerweb'
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
      var player = new SVGA.Player('#demoCanvas')
      var parser = new SVGA.Parser() // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
      parser.load('./rose_2.0.0.svga', function (videoItem) {
        player.setVideoItem(videoItem)
        player.startAnimation()
      })
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
    <div id="demoCanvas" style="width: 200px; height: 200px"></div>
  </div>
</template>
<style lang="less" scoped></style>
