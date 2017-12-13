<template>
    <div class="radio">
        <label @click="handleClick">
            <i class="radio-box tofu-icon icon-check"
                :class="{checked: interValue}"
            ></i>
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: 'radio',

    props: {
        value: Boolean,
        label: String
    },

    data () {
        return {
            interValue: false
        }
    },

    methods: {
        handleClick () {
            this.interValue = !this.interValue;
            this.$emit('input', this.interValue);
        }
    }
}
</script>

<style lang="scss">
.radio {

    label {
        display: inline-block;
        height: 16px;
        line-height: 16px;

        font-size: 12px;

        cursor: pointer;
        user-select: none;
    }

    .radio-box {
        display: inline-block;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        line-height: 14px;

        margin-right: 4px;

        font-size: 14px;
        color: #fff;
        text-align: center;
        vertical-align: top;

        border-radius: 4px;
        border: 1px solid #C0CCDA;

        &.checked {
            border: 1px solid transparent;
            background: #20A0FF;
        }
    }
}
</style>
