<template>
    <div>
        <button class="btn">
            <slot></slot>
        </button>
        <button class="btn">
            <slot name="hasName"></slot>
        </button>
        <button class="btn">
            <slot name="scopeSlot" :userName="userName"></slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Btn",
        data() {
            return {
                userName: 'wdq'
            }
        }
    }
</script>

<style lang="scss">
.btn {
    position: relative;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
}
.btn::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
}
</style>
