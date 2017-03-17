<template>
    <button :disabled="!canUse"
            class="el-button"
            @click="handleClick"
            :type="nativeType"
            :class="[
                type ? 'el-button-' + type : '',
                size ? 'el-button-' + size : '',
                {
                    'is-disabled': !canUse,
                    'is-loading': loading,
                    'is-plain': plain
                }
            ]">
        <i class="el-icon-loading" v-if="loading"></i>
        <i :class="'el-icon-' + icon" v-if="icon && !loading"></i>
        <slot></slot>
    </button>
</template>
<script>
    /**
     * button
     */
    export default {
        name: 'ElButton',

        props: {
            type: {
                type: String,
                default: 'default'
            },
            size: String,
            icon: {
                type: String,
                default: ''
            },
            nativeType: {
                type: String,
                default: 'button'
            },
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            plain: {
                type: Boolean,
                default: false
            },
            permission: {
                type: [String, Object]
            },
            premissions: {
                type: Array
            }
        },

        computed: {
            canUse () {
                return !this.disabled && !this.close
            }
        },

        methods:{
            handleClick(evt){
                this.$emit('click',evt);
            }
        },

        checkPermission (permission) {
            // if (permision instanceof Function) {

            // } else {
            //     switch (type of permision) {
            //         case 'string':
            //             this.close = true;
            //             break;
            //         case 'object':
                        
            //             break;
            //         default:
            //             break;
            //     }
            // }
        },

        created () {
            if (this.permission && window.permission[this.permission]) {
                this.close = true;
            } else {
                this.close = false;
            }
        }
    };
</script>
