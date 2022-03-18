<template>
  <div class="post-message">
    <button @click="send">开始发送</button>
  </div>
</template>

<script>
/**
 * 跨页面通信测试
 * @author waldon
 * @date 2022-03-10
 */
export default {
  name: 'postMessage',
  methods: {
    send() {
      const parentWindow = window.parent
      console.log('parentWindow', parentWindow)

      // 如果弹出框没有被阻止且加载完成

      // 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
      parentWindow.postMessage("The user is 'bob' and the password is 'secret'", '/')

      // 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
      parentWindow.postMessage('hello there!', 'http://localhost:8080/')
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
