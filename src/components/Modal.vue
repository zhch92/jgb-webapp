<template>
    <transition name="modal">
        <div class="modal-wrapper">
            <slot name="modal-container"></slot>
        </div>
    </transition>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        overflow:auto;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, .6);
        z-index: 99999;
    }
</style>
