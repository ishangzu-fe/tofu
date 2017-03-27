<template>
    <div class="el-select-dropdown"
         :class="{ 'is-multiple':$parent.multiple }"
         :style="{ minWidth:minWidth }">
        <slot></slot>
    </div>
</template>
<script>
    import Popper from '../../../utils/vue-popper';

    export default{
        name:'el-select-tree-menu',
        componentName:'select-tree-menu',
        mixins:[Popper],
        props:{
            placement:{
                default:'bottom-start'
            },
            boundariesPadding:{
                default:0
            },
            options:{
                default(){
                    return {
                        forceAbsolute:true,
                        gpuAcceleration:false
                    }
                }
            }
        },
        data(){
            return {
                minWidth:''
            }
        },
        watch:{
            '$parent.inputWidth'(){
                this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
            }
        },
        mounted(){
            this.referenceElm = this.$parent.$refs.reference.$el;
            this.$parent.popperElm = this.popperElm = this.$el;
            this.minWidth = (this.$parent.$el.getBoundingClientRect().width) + 'px';

            this.$on('updatePopper',this.updatePopper);
            this.$on('destoryPopper',this.destroyPopper);
        }
    }
</script>