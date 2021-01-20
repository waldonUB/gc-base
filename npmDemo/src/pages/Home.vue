<template>
    <div>
        <div class="current">
            我是
        </div>
        <h1>我是h1</h1>
        <span class="title">
            我是title
        </span>
        <btn>
            <template v-slot>
                <p>我是父组件传过来的内容</p>
            </template>
            <template v-slot:hasName>
                <p>具名插槽</p>
            </template>
            <template v-slot:scopeSlot="scopeInfo">
                <p>作用域插槽：{{scopeInfo.userName}}</p>
            </template>
        </btn>
        <childTemp name="我是" :sex="6"></childTemp>
    </div>
</template>
<script>
    let grandChildTemp = {
        template: `
            <div>{{attrCal}}</div>
        `,
        computed: {
            attrCal () {
                return this.$attrs
            }
        }
    }
    let childTemp = {
        template: `
            <div>
                {{$attrs}}
                <grandChildTemp v-bind="$attrs"></grandChildTemp>
            </div>
        `,
        components: {grandChildTemp},
        props: {
            name: {
                type: String,
                default: ''
            }
        }
    }
    import Btn from '../components/Btn.vue'
    export default {
        name: 'Home',
        data() {
            return {

            }
        },
        components: {Btn, childTemp}
    }
</script>

<style scoped lang="scss">
    .current {
        color: blue;
        font-size: 60px;
    }
</style>
