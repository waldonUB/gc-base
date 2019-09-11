<template>
    <div >
        <button ref="VOnTest" @click="testEmit">{{testVOn}}</button>
        <button @click="addCount">{{count}}</button>
        <button @click="addCount">{{count2}}</button>
        <button @click="addCount">{{count3}}</button>
        {{observeData.a}}
        <p>{{prototypeTest}}</p>
        <p>{{rootTest}}</p>
    </div>
</template>

<script>
    import Vue from "vue"
    import {normal} from "../../../src/js/testNormal"
    import {store} from "../../../src/js/testObservable"
    export default {
        name: "VON",
        components: {Vue},
        computed: {
            count() {
                return normal.a
            },
            count2() {
                console.log(`计算属性内的b：` + store.testInfo.b)
                return store.testInfo.b
            },
            count3() {
                return this.observeData.a
            },
            prototypeTest() {
                return this.store.store
            },
            rootTest() {
                console.log(`VON的$root改变了`)
                return this.$root.root
            }
        },
        data() {
            return {
                testVOn: '666',
                observeData: {
                    // a: ''
                },
                jsStore: {}
                // bb: 0
            }
        },
        methods: {
            testEmit() {
                let that = this
                // setInterval(function () {
                //     that.bus.$emit('testEmit', that.testVOn)
                // }, 3000)
            },
            addCount() {
                // 无法生效，因为不是在渲染的响应式属性中
                this.$set(normal, 'a', ++normal.a)
                this.$set(normal, 'b', ++normal.a)
                if (!store.testInfo.b) {
                    this.$set(store.testInfo, 'b', 1)
                }
                this.$set(store.testInfo, 'b', ++store.testInfo.b)
                // 测试data中的往Object中添加响应式属性
                if (!this.observeData.a) {
                    this.$set(this.observeData, 'a', 1)
                }
                this.$set(this.observeData, 'a', ++this.observeData.a)
                // 测试data中往根属性添加响应式属性
                // 测试结果：无法生效（官方：注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象）
                // if (!this.bb) {
                //     this.$set(this, 'bb', 666)
                // }

                // 测试prototype中的属性的响应式
                // 结果：非响应式
                this.store.store = this.observeData.a
                console.log(`normal:` + JSON.stringify(normal))
                // 测试根实例$root，结果：这两种写法都是响应式
                // console.log(this.$root.$data.root = '666')
                // console.log(this.$root.root = '888')
            }
        },
        mounted() {
            const that = this
            // 总线机制/bus可以非父子组件内传值
            this.bus.$on('testEmit', function (data) {
                console.log(`VON:` + data)
                that.testVOn = that.testVOn === '888' ? '666' : '888'
            })
            // 根元素可以非父子组件内传值
            this.$root.store = {
                name: 'wdq'
            }
            // vue2.6的observable
            console.log(`VON:` + JSON.stringify(this.store))
            this.store.store = '888'
            console.log(normal)
            this.jsStore = store
        },
        destroyed(data) {
            console.log(`跳转路由被摧毁了` + data)
        }
    }
</script>

<style scoped>

</style>
