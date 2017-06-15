<template>
    <div class="popup" @click="trigger = false">
        <div class="popup-trigger" @click.stop="handleTriggerClick">
            <i class="popup-icon-left"
                :class="iconClass"
                v-if="iconClass"
            ></i>
            <span class="popup-title">{{title}}</span>
            <i class="popup-icon-right tofu-icon icon-triangle-down"
                :class="{reverse: direction === 'north' ? !trigger : trigger}"
            ></i>
        </div>
        <transition name="popup">
            <div class="popup-menu"
                :class="direction"
                v-show="trigger"
                @click.stop="autoClose && (trigger = false)">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'popup',

    props: {
        title: String,
        direction: {
            type: String,
            default: 'south'
        },
        iconClass: String,
        autoClose: Boolean
    },

    data () {
        return {
            trigger: false
        }
    },

    methods: {
        handleMenuClick () {

        },

        handleTriggerClick () {
            this.trigger = !this.trigger;
        }
    }
}
</script>

<style lang="scss">
.popup {
    display: inline-block;

    position: relative;

    &:before {
        content: '';
        width: 100%;
        height: 100%;

        position: fixed;
        left: 0;
        top: 0;

        background: transparent;
    }

    // 触发器
    .popup-trigger {
        display: inline-block;
        box-sizing: border-box;
        line-height: 14px;
        padding: 6px 4px 6px 10px;

        position: relative;
        z-index: 1;

        border: 1px solid #C0CCDA;
        border-radius: 2px;

        background: #fff;

        user-select: none;

        cursor: pointer;

        .popup-title {
            display: inline-block;
            height: 14px;
            line-height: 14px;

            color: #1F2D3D;
            font-size: 12px;
            vertical-align: middle;
        }

        .popup-icon-left {
            display: inline-block;
            width: 14px;
            height: 14px;

            font-size: 14px;
            color: #7F8FA4;
            text-align: center;
            vertical-align: middle;
        }

        .popup-icon-right {
            display: inline-block;
            width: 14px;
            height: 14px;
            line-height: 14px;

            font-size: 14px;
            color: #7F8FA4;
            text-align: center;

            transition: transform .25s ease-in-out;

            &.reverse {
                transform-origin: center;
                transform: rotate(180deg);
            }
        }
    }

    // 弹出框
    .popup-menu {
        display: inline-block;
        min-width: 120px;

        z-index: 100;

        border-radius: 2px;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.20);

        background: #fff;

        transform: scaleY(1);

        &.south {
            position: absolute;
            left: 0;
            top: 34px;

            transform-origin: top;
        }

        &.north {
            position: absolute;
            left: 0;
            bottom: calc(100% + 4px);

            transform-origin: bottom;
        }
    }

    // 动画
    .popup-enter {
        transform: scaleY(.01);
    }
    .popup-enter-active {
        transition: transform .25s ease-in-out;
    }
    .popup-leave {
        transform: scaleY(1);
    }
    .popup-leave-active {
        transform: scaleY(.01);
        transition: transform .25s ease-in-out;
    }
}
</style>
