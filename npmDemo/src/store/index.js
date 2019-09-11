import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        count: 0,
        visible: false
    },
    mutations: {
        changeVisible(state, type) {
            setTimeout(()=> {
                state.visible = type
            }, 1000)
        },
        asyncTest(state) {
            setTimeout(()=> {
                state.count++
            }, 1000)
        },
        syncTest(state) {
            state.count++
        }
    },
    actions: {
        dispatchVisible(context, type) {
            context.commit('changeVisible', type)
        },
        dispatchAsync({commit}) {
            setTimeout(() => {
                console.log('我是dispatchAsync内的')
                commit('syncTest')
            }, 1000)
        }
    }
});

