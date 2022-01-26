<template>
  <a-button type="primary" @click="toSubPage">跳转子路由</a-button>
</template>

<script>
export default {
  name: 'AppHome',
  setup(props) {
    console.log(props)
    const toSubPage = () => {
      console.log(111)
    }

    return {
      toSubPage,
    }
  },
}
</script>
