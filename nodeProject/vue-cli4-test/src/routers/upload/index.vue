<template>
  <div class="upload">
    <button @click="singleUpload">单文件上传</button>
    <button @click="multipartUpload">多文件上传</button>
    <div class="child">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  methods: {
    singleUpload() {
      this.$router.push({
        name: 'singleUpload',
      })
    },
    multipartUpload() {
      this.$router.push({
        name: 'multipartUpload',
      })
    },
  },
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
