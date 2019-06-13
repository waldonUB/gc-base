<template>
    <div>
        <keep-alive>
            <component :is="currentTemp"></component>
        </keep-alive>
        <el-button type="success" @click="openDialog('dialog1')">打开dialog1</el-button>
        <el-button type="warning" @click="openDialog('dialog2')">打开dialog2</el-button>
    </div>
</template>

<script>
    const dialog1 = {
        template: `<el-dialog></el-dialog>`
    }
    const dialog2 = {
        template: `<el-dialog></el-dialog>`
    }
    export default {
        name: "SimpleDialogTest",
        components: {dialog1, dialog2},
        data() {
            return {
                currentTemp: ''
            }
        },
        methods: {
            openDialog(type) {
                this.currentTemp = type
            }
        }
    }
</script>

<style scoped>

</style>
