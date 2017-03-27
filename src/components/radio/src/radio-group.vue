<template>
    <div class="el-radio-group">
        <slot></slot>
    </div>
</template>
<script>
    import emitter from '../../../utils/emitter';

    export default {
        name: 'ElRadioGroup',
        componentName:'radio-group',
        mixins:[emitter],
        props:{
            value:[String,Number],
            size:String,
            fill:{
                type:String,
                default:'#20a0ff'
            },
            textColor:{
                type:String,
                default:'#fff'
            }
        },
        watch:{
            value(value){
                this.$emit('change',value);
                this.broadcast('radio','initData',value);
                this.dispatch('form-item','el.form.change',[this.value]);
            }
        },
        mounted(){
            this.broadcast('radio','initData',this.value);
        }
    }
</script>