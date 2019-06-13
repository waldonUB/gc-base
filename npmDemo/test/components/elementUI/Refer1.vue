<template>
    <el-dialog :visible="$store.state.visible"
               @close="closeDialog"
               title="测试参照">
        <span>我是一个小参照</span>
        <input type="text">
    </el-dialog>
</template>

<script>
    export default {
        name: "Refer1",
        // props: ['visible'], 两种写法都可，不是对象记得加引号
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
            console.log(`进到了Refer的activated`)
        }
    }
</script>

<style scoped>

</style>
