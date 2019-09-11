<template>
    <div>
        <Vuex1></Vuex1>
        <Vuex2></Vuex2>
        <el-button @click="asyncTest">在mutation中异步</el-button>
        <el-button @click="dispatchAsync">在action中异步</el-button>
        <el-button @click="asyncTestFn">测试async</el-button>
    </div>
</template>

<script>
    function time3000() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
                console.log('我完事了')
            }, 3000)
        })
    }
    import Vuex1 from "../components/vuex/Vuex1.vue"
    import Vuex2 from "../components/vuex/Vuex2.vue"
    export default {
        name: "VuexTest",
        components: {Vuex1, Vuex2},
        methods: {
            asyncTest() {
                this.$store.commit('asyncTest')
                console.log(this.$store.state.count)
            },
            dispatchAsync() {
                this.$store.dispatch('dispatchAsync').then(() => {
                    console.log('我是方法内的')
                })
                console.log(this.$store.state.count)
            },
            // 这里async函数返回的就是一个promise对象，而await后面跟的就是promise对象才会等待
            async asyncTestFn() {
                let val = await time3000()
                console.log(`我在完事后`)
            }
        },
        mounted() {
            // console.log(this.$store.state.count)
        }
    }
</script>

<style scoped>

</style>
