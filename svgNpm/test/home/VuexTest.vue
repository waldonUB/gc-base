<template>
    <div>
        <Vuex1></Vuex1>
        <Vuex2></Vuex2>
    </div>
</template>

<script>
    import Vuex1 from "../components/vuex/Vuex1.vue"
    import Vuex2 from "../components/vuex/Vuex2.vue"
    export default {
        name: "VuexTest",
        components: {Vuex1, Vuex2},
        mounted() {
            debugger
            console.log(this.$store.state.count)
        }
    }
</script>

<style scoped>

</style>
