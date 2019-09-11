<template>
    <div>我是Destroy2</div>
</template>

<script>
    export default {
        name: "Destroy2",
        destroyed() {
            console.log(`我是Destroy2，我被销毁了`)
        }
    }
</script>

<style scoped>

</style>
