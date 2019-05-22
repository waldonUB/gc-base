<template>
    <div class="container">
        <DeepChild></DeepChild>
    </div>
</template>

<script>
    import DeepChild from "../components/DeepChild.vue"
    export default {
        name: "TestDeep",
        components: {DeepChild}
    }
</script>

<style scoped lang="scss">
    .container {
        height: 200px;
    }
    /*有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ */
    /*或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作*/
    /deep/ .btn-child {
        color: yellow;
    }
    /*.btn-child {*/
        /*color: yellow;*/
    /*}*/
</style>
