const store = new Vuex.Store({
  strict: true,
  state: {
    userInfo: {
      name: 'waldon',
      age: 18,
      sex: 'man',
    },
  },
  mutations: {
    setUserInfo(state, { prop, value }) {
      state.userInfo[prop] = value
    },
  },
})
export default store
