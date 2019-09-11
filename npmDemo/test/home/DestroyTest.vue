<template>
    <div>
        <button @click="toggleComponent">Toggle</button>
        <keep-alive>

        </keep-alive>
        <component :is="destroyName"></component>

    </div>
</template>

<script>
    import Destroy1 from "../components/destroy/Destroy1.vue"
    import Destroy2 from "../components/destroy/Destroy2.vue"
    export default {
        name: "DestroyTest",
        components: {Destroy1, Destroy2},
        data: function() {
            return {
                destroyName: 'destroy1'
            }
        },
        methods: {
            toggleComponent() {
                this.destroyName = this.destroyName === 'destroy1' ? 'destroy2' : 'destroy1'
            }
        }
    }
</script>

<style scoped>

</style>
