<template>
    <div>
        <router-link to="/dynamicRouter/name1">跳转到路由1</router-link>
        <router-link to="/dynamicRouter/name2">跳转到路由2</router-link>
        <button @click="pushTest(1)">push的方式跳转1</button>
        <button @click="pushTest(2)">push的方式跳转2</button>
    </div>
</template>

<script>
    export default {
        name: "DynamicRouterTest",
        methods: {
            pushTest(type) {
                if (type === 1) {
                    // 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。
                    // 取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path
                    // this.$router.push({ name: 'DynamicRouter', params: { name: '123' }})
                    // this.$router.push({ path: '/dynamicRouter/123'})
                    // query是只针对path路径的吗？
                    this.$router.push({ path: '/dynamicRouter/name123',query: { name: '123' }})
                    // 如果没有动态路由参数的匹配，就无法保存在url中，params传过去之后，刷新就没有啦
                    // this.$router.push({ name: 'DynamicRouter', params: { name: '123', userId: '666'}})
                } else if (type === 2) {
                    this.$router.push({ name: 'DynamicRouter', params: { name: '456' }})
                }
            }
        }
    }
</script>

<style scoped>

</style>
