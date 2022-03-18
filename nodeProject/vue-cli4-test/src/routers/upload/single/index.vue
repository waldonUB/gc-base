<template>
  <div class="single-upload">
    <p>单文件上传</p>
    <input type="file" @change="changeFile" />
    <button @click="uploadFile">开始上传</button>
  </div>
</template>

<script>
import { service } from '@/config/http.js'
import { calcFileMD5 } from '@/utils/common.js'
export default {
  name: 'SingleUpload',
  data() {
    return {
      file: [],
    }
  },
  methods: {
    changeFile(e) {
      this.file = e.target.files[0]
    },
    async uploadFile() {
      const fileMD5 = await calcFileMD5(this.file)
      const formData = new FormData()
      formData.set('file', this.file)
      formData.append('name', 'waldon')
      service.post('upload/upload-single', formData).then((res) => {
        console.log(res)
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
