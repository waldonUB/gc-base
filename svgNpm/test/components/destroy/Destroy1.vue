<template>
    <div>我是Destroy1</div>
</template>

<script>
    export default {
        name: "Destroy1",
        destroyed() {
            console.log(`我是Destroy1，我被销毁了`)
        }
    }
</script>

<style scoped>

</style>
