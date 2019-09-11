<template>
    <div>
        <button>1号：{{testComputed}}</button>
    </div>
</template>

<script>
    // 根组件的必须在根实例里面加上属性
    export default {
        name: "Correspond1",
        computed: {
            testComputed() {
                return this.$root.test
            }
        },
        created() {
            // this.$set(this.$root, 'test', Math.random() * 100)
        },
        mounted() {
            let that = this
            // setInterval(function () {
            //     // that.$root.test = Math.random() * 100
            //     that.$set(that.$root, 'test', Math.random() * 100)
            //     console.log(that.$root.test)
            // }, 1000)
        }
    }
</script>

<style scoped>

</style>
