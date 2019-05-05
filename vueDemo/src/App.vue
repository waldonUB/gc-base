<template>
<div>
    <!--<li-test :message="666"></li-test>-->
    我是组件模板{{dataContent}}
</div>
</template>

<script>
    // import liTest from './components/li-test'
    export default {
        name: "App",
        props: ['data-content']
    }
</script>

<style scoped>

</style>
