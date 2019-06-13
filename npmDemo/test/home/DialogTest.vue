<template>
    <div>
        <keep-alive>
            <component :is="currentDialog" :dialog-visible="dialogVisible"></component>
        </keep-alive>
        <el-button type="success" @click="openDialog('dialog1')">打开dialog1</el-button>
        <el-button type="warning" @click="openDialog('dialog2')">打开dialog2</el-button>
        <el-button @click="showState">showState</el-button>
    </div>
</template>

<script>
    import Dialog1 from "../components/elementUI/dialog/Dialog1.vue"
    import Dialog2 from "../components/elementUI/dialog/Dialog2.vue"
    export default {
        name: "DialogTest",
        components: {Dialog1, Dialog2},
        data() {
            return {
                currentDialog: 'dialog1',
                dialogVisible: false
            }
        },
        methods: {
            openDialog(type) {
                this.currentDialog = type
                let val = this.$store.dispatch('dispatchVisible', true)
                console.log(val)
            },
            showState() {
                console.log(`this.$store.state.visible:` + this.$store.state.visible)
            }
        }
    }
</script>

<style scoped>

</style>
