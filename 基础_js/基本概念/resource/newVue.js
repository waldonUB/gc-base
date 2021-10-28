const Toast = {
  template: `
    <div class="toast" v-if="isShow">
     toast
     </div>
  `,
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showToast({ title = '提示', duration = 2000, type = 'success', renderNode = null }) {
      if (renderNode) {
        // 这段只是测试可以添加的父节点
        renderNode.appendChild(this.$el)
      }
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, duration)
    }
  }
}
const toastPlugin = {
  install: (Vue) => {
    const Constructor = Vue.extend(Toast)
    const toastInc = new Constructor()
    toastInc.$mount(document.createElement('div'))
    document.body.appendChild(toastInc.$el)
    Vue.prototype.$toast = toastInc.showToast
  }
}
Vue.use(toastPlugin)
new Vue({
  data: {},
  methods: {
    showToast() {
      this.$toast({
        message: `展示内容`,
        duration: 3000,
        type: 'success',
        renderNode: document.getElementById('testNode')
      })
    }
  }
}).$mount('#app')
setTimeout(() => {}, 2000)
