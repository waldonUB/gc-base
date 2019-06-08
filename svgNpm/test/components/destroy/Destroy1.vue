<template>
    <div>我是Destroy1</div>
</template>

<script>
    export default {
        name: "Destroy1",
        beforeDestroy() {
            console.log(`Destroy1销毁前`)
        },
        destroyed() {
            console.log(`我是Destroy1，我被销毁了`)
        }
    }
</script>

<style scoped>

</style>
