<template>
    <el-popover
            placement="bottom"
            title="这是第二个popover"
            width="200"
            trigger="click"
            content="这是第二个popover，这是第二个popover，这是第二个popover">
        <el-button slot="reference">click 激活</el-button>
    </el-popover>
</template>

<script>
    export default {
        name: "Popover2"
    }
</script>

<style scoped>

</style>
