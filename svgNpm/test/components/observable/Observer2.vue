<template>
    <div>
        <button>2号：{{testComputed}}</button>
    </div>
</template>

<script>
    import {ob} from "./observerTest.js"
    export default {
        name: "Observer2",
        computed: {
            testComputed() {
                console.log(`Observer2发生变化`)
                return ob.test
            }
        }
    }
</script>

<style scoped>

</style>
