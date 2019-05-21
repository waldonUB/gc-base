<template>
    <div>
        <div :class="$style.current">
            我是home1
        </div>
        <h1>我是h1</h1>
        <span :class="$style.title">
            我是title
        </span>
    </div>
</template>
<script>
    export default {
        name: 'Home'
    }
</script>
<style lang="scss" module>
    @import "../css/reset";
    .current {
        color: blue;
        font-size: 60px;
    }
</style>
