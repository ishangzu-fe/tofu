<template>
    <div class="el-checkbox-group">
        <slot></slot>
    </div>
</template>
<script>
    import emitter from '../../../utils/emitter';

    export default {
        name: 'ElCheckboxGroup',
        componentName:'ElCheckboxGroup',
        mixins: [emitter],

        props: {
            value: {}
        },

        watch: {
            value(value) {
                this.$emit('change', value);
                this.dispatch('form-item', 'el.form.change', [value]);
            }
        }
    };
</script>