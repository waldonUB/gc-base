<template>
  <div class="multipart-upload">
    <p>多文件上传1</p>
    <input type="file" @change="changeFile" multiple />
    <button @click="uploadFile">开始上传</button>
    <button @click="testGet">测试get请求</button>
    <button @click="testPost">测试post请求</button>
  </div>
</template>

<script>
import { service } from '@/config/http.js'
export default {
  name: 'SingleUpload',
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    changeFile(e) {
      console.log('e.target.files', e.target.files)
      this.fileList = Array.from(e.target.files)
      console.log('this.fileList', this.fileList)
    },
    uploadFile() {
      const formData = new FormData()
      formData.set('file', this.fileList)
      formData.append('name', 'waldon')
      service
        .post('upload/upload-multipart', formData, {
          // headers: {
          //   post: {
          //     'content-type': 'multipart/form-data',
          //   },
          // },
        })
        .then((res) => {
          console.log(res)
        })
    },
    testGet() {
      service.get('test/cache-test').then((res) => {
        console.log(res)
      })
    },
    testPost() {
      service
        .post('upload/upload-form', {
          testPost: '测试post',
        })
        .then((res) => {
          console.log(res)
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
