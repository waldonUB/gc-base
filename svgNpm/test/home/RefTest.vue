<template>
    <div>
        <!--<refer :visible="visible" @closeDialog="closeDialog"></refer>-->
        <!--<refer2 :visible="visible" @closeDialog="closeDialog"></refer2>-->
        <keep-alive>
            <!--<refer1 :key="type"></refer1>-->
            <component is="refer1" :key="type"></component>
        </keep-alive>
        <el-button type="success" @click="openDialog('refer1')">打开</el-button>
        <el-button type="success" @click="openDialog('refer2')">打开2</el-button>
    </div>
</template>

<script>
    import Refer1 from "../components/elementUI/Refer1.vue"
    import Refer2 from "../components/elementUI/Refer2.vue"
    export default {
        name: "RefTest",
        components: {Refer1, Refer2},
        computed: {
            // currentTemp () {
            //     return 'refer' + this.type
            // }
        },
        data() {
            return {
                visible: false,
                temps: [],
                type: '',
                tempInfo: {
                    id: null,
                    type: '1',
                }

            }
        },
        methods: {
            openDialog (type) {
                // debugger
                // let flag = this.temps.find(item => item === type)
                // if (!flag) {
                //     this.temps.push(type)
                //     // this.type = type
                //     this.visible = true
                // }
                // this.visible = true
                this.type = type
                this.$store.commit('changeVisible', true)
            },
            closeDialog () {
                this.visible = false
            }
        }
    }
</script>

<style scoped>

</style>
