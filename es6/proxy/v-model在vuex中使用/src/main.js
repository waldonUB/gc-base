import store from '../store/index.js'
// Vue.use(Vuex) //  vuex或vue-router在检测到 Vue 是可访问的全局变量时会自动调用 Vue.use()

/**
 * 这个handler是针对vuex中用户信息更改的
 * @author waldon
 * @date 2022-01-01
 */
const userInfoHandler = {
  get(target, prop) {
    return store.state.userInfo[prop]
  },
  set(target, prop, value) {
    console.log(`设置属性-${prop}：`, value)
    store.commit('setUserInfo', {
      prop,
      value,
    })
    return true
  },
}

new Vue({
  store,
  computed: {
    stateProxy() {
      return new Proxy(store.state.userInfo, userInfoHandler)
    },
  },
}).$mount('#app')
