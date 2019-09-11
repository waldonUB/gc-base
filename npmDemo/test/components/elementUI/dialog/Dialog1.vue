<template>
    <el-dialog :visible="visible" @close="closeDialog">Dialog1 content</el-dialog>
</template>

<script>
    export default {
        name: "Dialog1",
        props: ['dialogVisible'],
        data() {
            return {
                visible: false
            }
        },
        watch: {
            '$store.state.visible'(newVal) {
                this.visible = newVal
            }
        },
        methods: {
            closeDialog() {
                let val = this.$store.dispatch('dispatchVisible', false)
                console.log(val)
            }
        }
    }
</script>

<style scoped>

</style>
