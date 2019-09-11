<template>
    <div>
        <!--这种写法在子组件规定了emit的事件就行-->
        <!--<child1 :message="message" @message="message = $event"></child1>-->
        <!--这个是完整的更新属性的写法-->
        <!--<child1 :message="message" @update:message="message = $event"></child1>-->
        <!--这个是官方的缩写-->
        <child1 :message.sync="message"></child1>
    </div>
</template>

<script>
    import Child1 from "../../test/components/customComponents/Child1.vue"
    export default {
        name: "CustomComponentTest",
        components: {Child1},
        data () {
            return {
                message: 'init'
            }
        },
        methods: {
            getMessage(param) {
                console.log(`这个是父类的message：` + param)
                return param
            }
        }
    }
</script>

<style scoped>

</style>
