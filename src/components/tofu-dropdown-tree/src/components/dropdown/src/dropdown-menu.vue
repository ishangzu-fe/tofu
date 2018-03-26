<template>
    <transition name="md-fade-bottom" @after-leave="doDestroy">
        <ul class="el-dropdown-menu" :style="{width: `${width}px`}" v-show="showPopper">
            <slot></slot>
        </ul>
    </transition>
</template>
<script>
    import Popper from '@/utils/vue-popper';

    export default {
        name: 'ElDropdownMenu',

        componentName: 'ElDropdownMenu',

        mixins: [Popper],

        props: {
            width: Number
        },

        created() {
            this.$on('visible', val => {
                this.showPopper = val;
            });
        },

        mounted() {
            this.$parent.popperElm = this.popperElm = this.$el;
            this.referenceElm = this.$parent.$el;
        },
        watch:{
            '$parent.menuAlign':{
                immediate:true,
                handler(val){
                    this.currentPlacement = `bottom-${val}`;
                }
            },

            width: {
                immediate: true,
                handler() {
                    this.updatePopper();
                }
            }
        }
    };
</script>
