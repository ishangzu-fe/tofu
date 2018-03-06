<template>
    <div class="tree-node" v-show="!node.parentNode || node.parentNode._expanded">
        <div
            class="node-main"
            :class="{ 'is-checked': !TreeModel._multiple && node._checked,
                'no-checkbox': !TreeModel._multiple }"
            @click="handleCheck">
            <span class="node-triangle"
                :style="{'padding-left': (16 * (node.level - 1) + 4) + 'px'}"
                :class="{'node-triangle-hidden': !node.childNodes.length}"
                @click.stop="expandOrCollapse">
                <i class="tofu-icon icon-triangle-right"
                    :class="{'rotate-90': node._expanded}">
                </i>
            </span>
            <span
                v-if="TreeModel._multiple"
                class="node-checkbox tofu-icon"
                :class="{
                    'icon-check': node._checked,
                    'icon-minus': node._hasChildChecked && !node._checked }"
                @click.stop="toggle">
            </span>
            <span class="node-label" :title="node.label">{{ node.label }}</span>
            <span class="node-count" v-if="showCounter && node.childNodes.length">
                {{checkedChildren}}/{{node.childNodes.length}}
            </span>
        </div>
        <tree-node
            v-if="hasRenderChildren"
            v-for="(node, index) in node.childNodes"
            :key="`${node.id}-${node.level}-${index}`"
            :node="node"
            :TreeModel="TreeModel"
            :watch="watch"
            @check="$emit('check')"
        ></tree-node>
    </div>
</template>

<script>
    import Node from './model/node'
    import Bus from './Bus'

    export default {
        name: 'tree-node',

        props: {
            TreeModel: Object,
            node: Node,
            showCounter: {
                type: Boolean,
                default: false
            },
            watch: Array
        },

        data() {
            return {
                hasRenderChildren: false
            }
        },

        computed: {
            checkedChildren () {
                return this.node.childNodes.filter(node => {
                    return node._checked
                }).length
            }
        },

        methods: {
            expandOrCollapse() {
                this.hasRenderChildren = true
                this.node._expanded = this.node._expanded ? false : true
            },

            check() {
                this.TreeModel.checkNode(this.node)
            },
            uncheck() {
                this.TreeModel.uncheckNode(this.node)
            },
            handleCheck(e) {
                if (this.node._checked) return
                if (!this.TreeModel._multiple) {
                    this.TreeModel.checkNode(this.node)
                    this.$emit('check')
                } else {
                    e.stopPropagation();
                }
            },

            toggle() {
                if (this.node._checked) {
                    this.uncheck()
                } else {
                    this.check()
                }

                this.$emit('check')
                if (this.watch.includes(this.node.id)) {
                    Bus.$emit('update', this.node.id, this.node._checked)
                }
            }
        }
    }
</script>

<style lang="scss">
    .tree-node {
        cursor: pointer;
        user-select: none;

        .node-main {
            box-sizing: border-box;
            width: 100%;
            height: 26px;
            line-height: 26px;
            padding: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            border-right: 10px solid transparent;
            cursor: pointer;

            &:hover {
                background: #f5f7fa;
            }

            &.no-checkbox:hover, &.is-checked {
                background: #f5f7fa;

                .node-label {
                    color: #409eff;
                    // font-weight: 700;
                }
            }

            .node-label {
                display: inline-block;
                padding: 0 10px 0 2px;
                height: 100%;

                vertical-align: top;

                color: #1a1a1a;
                font-size: 12px;
            }

            .node-count {
                float: right;

                color: #1a1a1a;
                font-size: 12px;
            }

            .node-triangle {
                display: inline-block;
                color: #b2b2b2;

                &.node-triangle-hidden {
                    visibility: hidden;
                }

                .tofu-icon {
                    display: inline-block;
                    font-size: 12px;
                    transition: transform .3s ease-out;

                    &.rotate-90 {
                        transform: rotate(90deg);
                    }
                }
            }

            .node-checkbox {
                display: inline-block;
                box-sizing: border-box;
                width: 14px;
                height: 14px;
                line-height: 12px;

                color: #000;
                font-size: 12px;
                text-align: center;
                vertical-align: middle;

                border: 1px solid #e5e5e5;
                border-radius: 4px;

                &:hover {
                    border-color: #20a0ff;
                }

                &.icon-check, &.icon-minus {
                    color: #fff;
                    border-color: #20a0ff;
                    background: #20a0ff;
                }
            }
        }
    }
</style>