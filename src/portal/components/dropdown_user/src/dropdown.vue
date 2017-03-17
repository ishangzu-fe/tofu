<template lang="html">
    <transition name="drop">
        <div class="vvc-dropdown" v-show="config.trigger">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        config: {
            require: true,
            validator () {
                return true
                // {
                //      trigger
                // }
            }
        }
    }
}
</script>

<style lang="scss">
.vvc-dropdown {
    position: fixed;
    top: 32px;
    right: 6px;
    z-index: 9999;

    background-color: #fff;

    box-shadow: 0 6px 15px 0 rgba(0,0,0,0.30);
    border-radius: 2px;
    text-align: left;
}

.drop-enter-active, .drop-leave-active {
    transition: all .3s ease-in-out;
}
.drop-enter, .drop-leave-active {
    opacity: 0;
}
</style>
