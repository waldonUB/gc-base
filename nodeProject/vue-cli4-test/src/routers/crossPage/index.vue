<template>
  <div class="cross-page">
    <p>跨页面通信</p>
    <button @click="listen">开始监听</button>
    <iframe
      src="http://127.0.0.1:5500/nodeProject/vue-cli4-test/src/routers/crossPage/postMessage/postMessageTest.html"
      frameborder="0"
    ></iframe>
    <router-view></router-view>
  </div>
</template>

<script>
/**
 * 跨页面通信测试
 * @author waldon
 * @date 2022-03-10
 */
export default {
  name: 'crossPage',
  methods: {
    remove() {
      window.removeEventListener('message')
    },
    listen() {
      console.log('开始监听message')
      window.addEventListener('message', (res) => {
        console.log('message: ', res)
      })
    },
    listenStorage() {
      console.log('开始监听message')
      window.addEventListener('message', (res) => {
        console.log('message: ', res)
      })
    },
  },
  created() {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child {
  width: 100%;
  border: 1px solid #333333;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 20px;
  min-height: 500px;
}
</style>
