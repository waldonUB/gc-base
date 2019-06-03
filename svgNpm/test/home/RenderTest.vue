<script>
    export default {
        props: {},
        name: "RenderTest",
        render(createElement, context) {
            console.log(`render中的context：` + context)
            return createElement('h2', '我是render啊')
        }
    }
</script>

<style scoped>

</style>
