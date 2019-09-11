<template>
    <div>
        <button @click="changeTest">1号：{{testComputed}}</button>
    </div>
</template>

<script>
    import {ob} from "./observerTest.js"
    export default {
        name: "Observer1",
        computed: {
            testComputed() {
                console.log(`Observer1发生变化`)
                return ob.test
            }
        },
        methods: {
            changeTest() {
                ob.test = Math.random()
            }
        }
    }
</script>

<style scoped>

</style>
