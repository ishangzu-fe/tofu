<template>
    <div class="context-menu-item"
        @mousemove="showPanel = true"
        @mouseout="showPanel = false">
        <li class="item-label" @click="handleClick">
            {{label}}
            <i v-if="children && children.length"></i>
        </li>
        <context-menu-panel
            v-if="children && children.length"
            v-show="showPanel"
            :isChildren="true"
            :horDirection="horDirection"
            :verDirection="childVerDirection">
            <context-menu-item
                v-for="(child, index) in children"
                :panelY="childrenPanelY"
                :index="index"
                :label="child.label"
                :handler="child.handler"
                :key="child.label"
                :iconURL="child.iconURL"
                :children="child.children"
                :horDirection="horDirection">
            </context-menu-item>
        </context-menu-panel>
    </div>
</template>

<script>
import ContextMenuPanel from './context-menu-panel';

export default {
    name: 'context-menu-item',

    components: {
        ContextMenuPanel
    },

    props: {
        label: String,
        iconURL: String,
        children: Array,
        handler: Function,
        horDirection: String,
        index: Number,
        panelY: Number
    },

    data() {
        return {
            showPanel: false,
            childrenPanelY: 0
        }
    },

    watch: {
        handler: {
            immediate: true,
            handler() {
                this.calculateY();
            }
        }
    },

    methods: {
        handleClick(e) {
            if (!this.children || !this.children.length) {
                this.handler();
            } else {
                e.stopPropagation();
            }
        },

        calculateY() {
            // 计算自己的 y 轴位置，以及子项面板的 y 轴位置
            const offsetTop = 22 * this.index + 8;
            this.y = offsetTop + this.panelY;

            if (this.children && this.children.length) {
                const childrenHeight = 22 * this.children.length + 16;
                const childVerDirection = window.innerHeight - this.y < childrenHeight
                    ? 'bottom' : 'top';
                this.childVerDirection = childVerDirection;

                if (childVerDirection === 'bottom') {
                    this.childrenPanelY = this.y - childrenHeight + 30;
                } else {
                    this.childrenPanelY = this.y - 8;
                }
            }
        }
    }
}
</script>

<style lang="scss">
.context-menu-item {
    position: relative;
    width: 100%;
    height: 22px;
    line-height: 22px;
    color: #000;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        color: #fff;
        background: #2a9bfd;

        >li i {
            border-left-color: #fff;
        }
    }

    li {
        padding: 0 16px 0 12px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        i {
            position: absolute;
            right: 12px;
            top: 7px;
            content: '';
            border-left: 4px solid #000;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
        }
    }
}
</style>
