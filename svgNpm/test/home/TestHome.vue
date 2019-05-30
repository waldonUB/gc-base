<template>
    <div class="container">
        <div class="current">
            我是
        </div>
        <h1>我是h1</h1>
        <span class="title">
            我是title
        </span>
        <!--2.6版本-->
        <!--v-slot的标签只能放在template或者组件之中-->
        <!--v-slot可以简写为#-->
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
        <!--2.5版本-->
        <!--slot在哪都可以放-->
        <slot-test>
            <p>普通插槽</p>
            <p slot="hasName">具名插槽</p>
            <p slot="scopeSlot" slot-scope="scopeInfo">作用域插槽：{{scopeInfo.userName}}</p>
        </slot-test>
        <v-o-n></v-o-n>
        <v-o-n2></v-o-n2>
    </div>
</template>
<script>
    // 这个项目不加.vue找不到？
    import SlotTest from '../components/SlotTest.vue'
    import VON from '../components/EventBus/VON.vue'
    import VON2 from '../components/EventBus/VON2.vue'
    export default {
        name: 'Home',
        data() {
            return {

            }
        },
        components: {SlotTest,VON, VON2}
    }
</script>

<style scoped lang="scss">
    @import "../../src/css/reset";
    .current {
        color: blue;
        font-size: 60px;
    }
</style>
