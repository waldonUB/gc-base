<template>
    <div>
        <button>2号：{{testComputed}}</button>
    </div>
</template>

<script>
    export default {
        name: "Correspond2",
        computed: {
            testComputed() {
                return this.$root.test
            }
        }
    }
</script>

<style scoped>

</style>
