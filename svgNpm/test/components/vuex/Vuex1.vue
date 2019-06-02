<template>
    <div>
        <button @click="addCount">Vuex1:{{$store.state.count}}</button>
    </div>
</template>

<script>
    export default {
        name: "Vuex1",
        methods: {
            addCount() {
                this.$store.state.count++
            }
        }
    }
</script>

<style scoped>

</style>
