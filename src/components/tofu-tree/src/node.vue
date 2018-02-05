<template>
    <div class="tree-node" v-show="!node.parentNode || node.parentNode._expanded">
        <div
            class="node-main"
            :class="{ 'is-checked': !TreeModel._multiple && node._checked,
                'no-checkbox': !TreeModel._multiple }"
            :style="{'padding-left': (16 * (node.level - 1) + 10) + 'px'}"
            @click="!TreeModel._multiple && check()">
            <span
                class="node-triangle tofu-icon icon-triangle-right"
                :class="{'node-triangle-hidden': !node.childNodes.length,
                    'node-triangle-expand': node._expanded}"
                @click.stop="expandOrCollapse">
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
            @check="$emit('check')"
        ></tree-node>
    </div>
</template>

<script>
    import Node from './model/node'

    export default {
        name: 'tree-node',

        props: {
            TreeModel: Object,
            node: Node,
            showCounter: {
                type: Boolean,
                default: false
            }
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
                if (this.node._checked) return
                this.TreeModel.checkNode(this.node)
                this.$emit('check')
            },

            toggle() {
                // console.time()
                if (this.node._checked) {
                    this.TreeModel.uncheckNode(this.node)
                } else {
                    this.TreeModel.checkNode(this.node)
                }

                this.$emit('check')
                // console.timeEnd()
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
                    font-weight: 700;
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
                font-size: 12px;
                color: #b2b2b2;
                transition: transform .3s ease-out;

                &.node-triangle-hidden {
                    visibility: hidden;
                }

                &.node-triangle-expand {
                    transform: rotate(90deg);
                }
            }

            .node-checkbox {
                display: inline-block;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                line-height: 16px;

                color: #000;
                font-size: 12px;
                text-align: center;
                vertical-align: text-bottom;

                border: 1px solid #e5e5e5;
                border-radius: 4px;

                &:hover, &.icon-check, &.icon-minus {
                    border-color: #20a0ff;
                }

                &.icon-check {
                    color: #fff;
                    background: #20a0ff;

                    &:before {
                        position: relative;
                        top: -1px;
                    }
                }

                &.icon-minus {
                    color: #fff;
                    font-size: 12px;

                    background: #20a0ff;
                }
            }
        }
    }
</style>