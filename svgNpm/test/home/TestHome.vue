<template>
    <div class="container">
        <div class="current">
            我是
        </div>
        <h1>我是h1</h1>
        <span class="title">
            我是title
        </span>
        <slot-test>
            <template v-slot>
                <p>我是父组件传过来的内容</p>
            </template>
            <template v-slot:hasName>
                <p>具名插槽</p>
            </template>
            <template v-slot:scopeSlot="scopeInfo">
                <p>作用域插槽：{{scopeInfo.userName}}</p>
            </template>
        </slot-test>
    </div>
</template>
<script>
    import SlotTest from '../components/SlotTest.vue'
    export default {
        name: 'Home',
        data() {
            return {

            }
        },
        components: {SlotTest}
    }
</script>

<style scoped lang="scss">
    @import "../../src/css/reset";
    .current {
        color: blue;
        font-size: 60px;
    }
</style>
