<template>
    <div>
        <keep-alive>
            <component :is="currentTemp">
            </component>
        </keep-alive>
        <el-button type="success" @click="changeTemp('1')">改变为1</el-button>
        <el-button type="success" @click="changeTemp('2')">改变为2</el-button>
    </div>
</template>

<script>
    import Popover1 from "../components/elementUI/popover/Popover1.vue"
    import Popover2 from "../components/elementUI/popover/Popover2.vue"
    export default {
        name: "PopoverTest",
        components: {Popover1, Popover2},
        data() {
            return {
                currentTemp: ''
            }
        },
        watch: {

        },
        methods: {
            changeTemp(type) {
                this.currentTemp = 'popover' + type
            }
        }
    }
</script>

<style scoped>

</style>
