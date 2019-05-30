<template>
    <div >
        <button ref="VOnTest" @click="testEmit">{{testVOn}}</button>
    </div>
</template>

<script>
    import Vue from "vue"
    import {normal} from "../../../src/js/testNormal"
    export default {
        name: "VON2",
        components: {Vue},
        data() {
            return {
                testVOn: '777'
            }
        },
        methods: {
            testEmit() {
                // this.$emit('testEmit', this.testVOn)
            }
        },
        mounted() {
            const that = this
            this.bus.$on('testEmit', function (data) {
                console.log(`VON2:` + data)
                that.testVOn = that.testVOn === '888' ? '666' : '888'
            })
            console.log(this.$root.store)
            console.log(`VON2:` + JSON.stringify(this.store))
            console.log(`VON2:-normal:` + JSON.stringify(normal))
        }
    }
</script>

<style scoped>

</style>
