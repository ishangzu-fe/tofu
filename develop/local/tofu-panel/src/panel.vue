<template>
    <div class="tofu-panel-component" v-if="init" v-show="show">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'panel',

        props: {
            lazy: Boolean, // 懒加载机制
            toggle: Boolean
        },

        data () {
            return {
                init: false
            }
        },

        computed: {
            show () {
                if (this.lazy) {
                    if (this.init) {
                        return this.toggle
                    } else {
                        return false
                    }
                } else {
                    return this.toggle
                }
            }
        },

        watch: {
            toggle (v) {
                if (v && !this.init && this.lazy) {
                    this.init = true
                }
            }
        },

        created () {
            if (this.lazy) {
                this.init = false
            } else {
                this.init = true
            }
        }
    }
</script>

<style lang="scss">
    .tofu-panel-component {
        z-index: 2;
        
        box-shadow: 0 6px 15px 0 rgba(0,0,0,.3);
        border-radius: 2px;
        
        background: #FFFFFF;

        &::after {
            content: '';
            width: 100%;
            height: 100%;
            
            position: fixed;
            left: 0;
            top: 0;
            z-index: -1;
        }
    }
</style>