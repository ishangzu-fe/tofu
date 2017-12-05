<template>
    <div 
        class="tofu-button-component" 
        :class="{'button-active': isActive}"
        @click="toggle">
        <slot></slot>
        <span 
            class="button-label"
            :style="{padding: $slots.default ?
                    ($slots.tail ? '5px 0' : '5px 8px 5px 0') : 
                    ($slots.tail ? '5px 0px 5px 8px' : '5px 8px')}"
            v-if="label">
            {{label}}
        </span>
        <slot name="tail"></slot>
    </div>
</template>

<script>
    export default {
        name: 'tofu-button',

        props: {
            state: {  // 外部控制状态
                type: Boolean | Number,
                default: 0
            },
            label: String,
            width: String,
            height: String,
            size: String | Number, // 暂不支持
            hover: Boolean // 暂不支持
        },

        data () {
            return {
                active: false
            }
        },

        computed: {
            isActive () {
                if (this.state !== 0) {
                    return this.state
                } else {
                    return this.active
                }
            }
        },

        methods: {
            toggle () {
                this.active = this.active ? false : true

                if (this.active) {
                    this.$emit('activate')
                } else {
                    this.$emit('deactivate')
                }
            }
        }
    }
</script>

<style lang="scss">
    $button-height: 24px;
    $button-radius: 2px;

    $button-label-padding: 5px 0;
    $button-label-font-size: 12px;

    $background-hover: #313D4F;
    $background-active: #14161A;

    .tofu-button-component {
        box-sizing: border-box;
        height: $button-height;
        line-height: $button-height - 2px;

        color: #fff;

        border: 1px solid transparent;
        border-radius: $button-radius;

        background: transparent;

        cursor: pointer;
        user-select: none;

        &:hover {
            border: 1px solid #364357;
            
            background: $background-hover;
        }

        &.button-active {
            border: 1px solid $background-active;
            
            background: $background-active;
        }

        .button-label {
            box-sizing: border-box;
            height: 100%;
            padding: $button-label-padding;

            font-size: $button-label-font-size;
            text-align: left;
        }
    }
</style>