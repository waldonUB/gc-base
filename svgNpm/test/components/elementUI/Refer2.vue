<template>
    <el-dialog :visible="$store.state.visible"
               @close="closeDialog"
               title="测试参照">
        <span style="color: red">我是二个小参照</span>
        <input type="text">
    </el-dialog>
</template>

<script>
    export default {
        name: "Refer2",
        // props: {
        //     visible: {
        //         require: true
        //     }
        // },
        data () {
            return {
                // visible: false
            }
        },
        methods: {
            openDialog () {
            },
            closeDialog() {
                // this.$emit('closeDialog')
                // this.visible = false
                this.$store.commit('changeVisible', false)
            }
        },
        activated() {
            console.log(`进到了Refer2的activated`)
        }
    }
</script>

<style scoped>

</style>
