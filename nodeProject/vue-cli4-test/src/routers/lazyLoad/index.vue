<template>
  <div class="lazy-load">
    <div class="img-wrapper">
      <div class="content"></div>
      <img v-if="isShow" class="img-content" v-lazyLoad="imgSrc" alt="" srcset="" />
      <img v-if="isShow" class="img-content" v-lazyLoad="imgSrc" alt="" srcset="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'LazyLoad',
  data() {
    return {
      list: [
        {
          a: 1,
        },
      ],
      imgSrc:
        'https://p26-passport.byteacctimg.com/img/user-avatar/9954bc0498b4b8f87115a329faeb7ef5~300x300.image',
      isShow: true,
    }
  },
  created() {
    // setInterval(() => {
    //   this.isShow = !this.isShow
    // }, 2000)
  },
}
</script>
<style>
.lazy-load {
}
.img-wrapper {
  width: 500px;
  height: 800px;
  margin: 0 auto;
  border: 1px solid #eeeeee;
  overflow-y: auto;
}
.content {
  height: 2000px;
  background-color: red;
}
.img-content {
  width: 200px;
  height: 200px;
  border-radius: 4px;
  background-color: yellow;
}
</style>
