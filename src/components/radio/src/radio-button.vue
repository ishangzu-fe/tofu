<template>
    <label class="el-radio-button"
           :class="[
                size ? 'el-radio-button-' + size : '',
                { 'is-active': value === label }]">
        <input class="el-radio-button-orig-radio"
                :value="label"
                type="radio"
                v-model="value"
                :name="name"
                :disabled="disabled">
        <span class="el-radio-button-inner" :style="value === label ? activeStyle : null">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>
<script>
    export default{
        name:'ElRadioButton',
        props:{
            label:{
                type:[String,Number],
                required:true
            },
            disabled:Boolean,
            name:String
        },
        data() {
            return {
                size:this.$parent.size
            }
        },
        computed:{
            value:{
                get() {
                    return this.$parent.value;
                },
                set(newValue) {
                    this.$parent.$emit('input',newValue);
                }
            },
            activeStyle(){
                return {
                    backgroundColor: this.$parent.fill,
                    borderColor:this.$parent.fill,
                    color:this.$parent.textColor
                }
            }
        }
    }
</script>