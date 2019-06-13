<template>
    <div>
        <button @click="addCount">Vuex2:{{$store.state.count}}</button>
    </div>
</template>

<script>
    export default {
        name: "Vuex2",
        watch: {
            '$store.state.count'(newVal) {
                console.log(`watch Vuex1:` + newVal)
            }
        },
        methods: {
            addCount() {
                this.$store.state.count++
            }
        }
    }
</script>

<style scoped>

</style>
