<template>
    <div>
        <observer1></observer1>
        <observer2></observer2>
    </div>
</template>

<script>
    import Observer1 from "../components/observable/Observer1.vue"
    import Observer2 from "../components/observable/Observer2.vue"
    export default {
        name: "TestObserver",
        components: {Observer1, Observer2}
    }
</script>

<style scoped>

</style>
