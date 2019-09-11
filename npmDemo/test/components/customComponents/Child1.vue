<template>
    <!--自定义组件-->
    <div>
        <input type="text" @input="change">
        <p>message1:{{message}}</p>
    </div>
</template>

<script>
    export default {
        name: "Child1",
        props: ['message'],
        methods: {
            change(e) {
                this.$emit('update:message', e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
