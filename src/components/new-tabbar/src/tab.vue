<template>
    <div
        class="tab"
        :class="{'tab-active': tab.id === activeId,
                'is-moving': isMoving, 
                'is-not-moving': !isMoving && hasTabMoving}"
        :style="{width: `${width}px`, 
                transform: tab.fixed ? 
                'none' : `translateX(${tab.moveOffset}px)`}"
        @click="activate"
        v-drag.x="!tab.fixed"
        v-drag:start="onDragstart"
        v-drag:move="onDrag"
        v-drag:end="onDragend">
        <span class="tab-label" :title="tab.id">
            <span 
                class="tab-label-container"
                :style="{transform: `translateX(${-labelTranslate}px)`}"
                @mouseenter.stop="onLabelOver"
                @mouseleave.stop="onLabelLeave">
                {{tab.label}}
            </span>
        </span>
        <span 
            class="tab-close tofu-icon" 
            :class="activeId === tab.id ? 'icon-close-circle' : 'icon-close'"
            v-if="!tab.fixed" 
            @click.stop="destroy">
        </span>
    </div>
</template>

<script>
    const computeOffset = (moveX, tabWidth) => {
        const moveXABS = Math.abs(moveX)
        const direction = moveX > 0 ? 1 : -1
        // 偏移量 = (Math.floor((移动量 - 宽度 / 2) / 宽度) + 1) * 方向
        let offset = (Math.floor((moveXABS  - tabWidth / 2) / tabWidth) + 1) * direction
        return offset
    }

    export default {
        name: 'tab',

        props: {
            // id: String | Number,
            // idx: Number,
            // label: String,
            // path: String,
            // moveOffset: Number, // 移动偏移量
            // fixed: Boolean // 是否固定，用来判断能否删除和移动
            tab: Object, // include above props
            isFixedWidth: Boolean,
            tabWidth: Number,
            activeId: String | Number, // 当前激活的 tabId
            hasTabMoving: Boolean // 是否有 tab 正在被拖拽
        },

        data () {
            return {
                isMoving: false, // 通过判断是否是当前拖拽目标，来确定是否设置过渡
                offset: 0, // 当前元素的偏移量
                labelTranslate: 0 // 标签的移动量
            }
        },

        computed: {
            width () {
                // 计算 tab 的宽度
                if (this.isFixedWidth === true) {
                    return this.tabWidth
                } else {
                    // 暂时不考虑
                    // 仅在滚动模式下适用
                }
            }
        },

        methods: {
            /**
            * 仅在主动激活时，会调用此方法，
            * 被动激活，仅通过 tabbar 传递的 id 来判断是否被激活
            * 激活后，通过类的添加来改变样式,
            * 如果使用了路由，则会激活路由
            */
            activate () {
                this.$emit('tab-activate', this.tab.id)
            },

            destroy () {
                this.$emit('tab-destroy', this.tab.id)
            },

            /**
            * 在拖拽开始时，通知父组件自己开始移动，
            * 同时激活当前 tab
            * 设置其他 tab 的过渡，初始化移动量
            */
            onDragstart (e) {
                this.isMoving = true
                this.$emit('tab-dragstart', this)
            },

            /**
            * 在拖拽的同时，计算移动量（大于自身的一半时，即可交换位置)，
            * 判断是否需要与相邻 tab 交换位置，
            * 如果需要则通知 tabbar 来交换位置
            */
            onDrag (e) {
                let offset = computeOffset(e.moveX, this.tabWidth)
                if (offset !== this.offset) {
                    this.$emit('tab-drag', offset, this)
                    this.offset = offset
                }
            },

            /**
            * 拖拽结束时，计算移动量，控制 tab 的显示位置，
            * 通知父组件进行数据的交换，以及清除所有 tab 的移动量，
            * 重置当前 tab 偏移量
            */
            onDragend (e) {
                this.$emit('tab-dragend', this.offset, this)
                this.offset = 0
                this.isMoving = false
            },

            /**
             * 当鼠标浮在标签上时，标签向左滑动
             */
            onLabelOver (e) {
                const label = e.currentTarget
                const labelWidth = e.currentTarget.offsetWidth
                const parent = label.parentNode
                const parentWidth = parent.offsetWidth
                let diff = labelWidth - parentWidth

                if (diff > 0) {
                    this.labelTranslate = diff
                }
            },

            onLabelLeave () {
                this.labelTranslate = 0
            }
        }
    }
</script>

<style lang="scss">
    $tab-height: 30px;
    $tab-border-radius: 2px;
    $tab-margin-right: 6px;
    $tab-background-active: #fff;
    $tab-background-inactive: rgba(255, 255, 255, .1);
    $tab-background-hover: rgba(255, 255, 255, .7);
    $tab-font-size: 12px;
    $tab-color-inactive: #A3ACBA;
    $tab-color-active: #1F2D3D;

    $tab-close-width: 24px;
    $tab-close-color-active: #A12D19;
    $tab-close-color-active-hover: #E6452A;
    $tab-close-color-inactive: #A8AAB7;
    $tab-close-color-inactive-hover: #1F2D3D;

    $tab-label-margin-left: 10px;
    $tab-label-width: calc(100% - #{$tab-close-width} - #{$tab-label-margin-left});

    .tab {
        display: inline-block;
        box-sizing: border-box;
        height: $tab-height;
        line-height: $tab-height;

        position: relative;
        margin-right: $tab-margin-right;

        color: $tab-color-inactive;
        font-size: $tab-font-size;

        border-top-left-radius: $tab-border-radius;
        border-top-right-radius: $tab-border-radius;

        background: $tab-background-inactive;

        cursor: pointer;
        user-select: none;

        &:hover:not(.tab-active) {
            color: $tab-color-active;

            transition: background .3s ease-in;
            background: $tab-background-hover;

            .tab-close {
                color: $tab-close-color-inactive-hover;
            }
        }

        &.tab-active {
           color: $tab-color-active;

           background: $tab-background-active;

           &:hover .tab-close {
               color: $tab-close-color-active-hover;
           }

           .tab-close {
               color: $tab-close-color-active;
               font-size: 14px;

               transform: none;
           }
        }

        &.is-moving:before {
            content: '';
            width: 300%;
            height: 999px;
            
            position: absolute;
            top: -10px;
            left: -50%;

            background: transparent;
        }

        &.is-not-moving {
            transition: all .25s ease-in-out;
        }

        .tab-label {
            display: inline-block;
            box-sizing: border-box;
            width: $tab-label-width;
            height: 100%;
            margin-left: $tab-label-margin-left;

            position: relative;

            background: transparent;

            overflow: hidden;

            .tab-label-container {
                position: absolute;
                top: 0;

                transition: all .5s linear;
                white-space: nowrap;
            }
        }

        .tab-close {
            display: inline-block;
            box-sizing: border-box;
            width: $tab-close-width;
            height: 100%;

            position: absolute;
            right: 0;
            top: 0;
            
            color: $tab-close-color-inactive;
            text-align: center;

            background: transparent;         

            cursor: pointer;         
        }
    }
</style>