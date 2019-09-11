<template>
    <div>
        <p>这是params：{{$route.params}}</p>
        <p>这是query：{{$route.query}}</p>
        <router-link to="/dynamicRouter/name1">跳转到路由1</router-link>
        <router-link to="/dynamicRouter/name2">跳转到路由2</router-link>
    </div>
</template>

<script>
    export default {
        name: "DynamicRouter",
        watch: {
            '$route.params.name' (newVal) {
                console.log(`当前路由的参数为:` + newVal)
            }
        },
        activated() {
            // console.log(`测试会不会进到这个方法`) 不会
        },
        mounted() {
            console.log(`初始化：` + this.$route.params)
        }
    }
</script>

<style scoped>

</style>
