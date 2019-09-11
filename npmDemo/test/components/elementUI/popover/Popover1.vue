<template>
    <el-popover
            placement="bottom"
            title="这是第一个popover"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">click 激活</el-button>
    </el-popover>
</template>

<script>
    export default {
        name: "Popover1"
    }
</script>

<style scoped>

</style>
