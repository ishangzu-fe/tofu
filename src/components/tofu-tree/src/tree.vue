<template>
    <div class="tree">
        <node
            v-for="node in nodes"
            :key="node.id"
            :node="node"
            :TreeModel="TreeModel"
            :showCounter="showCounter"
            @check="emitCheck"
        ></node>
    </div>
</template>

<script>
    import getTreeInstance from './model/tree'
    import Node from './node'

    export default {
        name: 'tree',

        components: {
            Node
        },

        props: {
            data: Array,
            dict: Object,
            showCounter: {
                type: Boolean,
                default: false
            },
            checkChildren: {
                type: Boolean,
                default: true
            },
            singleton: {
                type: Boolean,
                default: false
            },
            checkedNodes: Array
        },

        data () {
            return {
                TreeModel: {},
                nodes: []
            }
        },

        watch: {
            data(newData) {
                if (newData) this.createTree()
            }
        },

        methods: {
            emitCheck (checkedNodes) {
                this.$emit('change', checkedNodes)
            },

            clean() {
                this.clear()
            },

            clear () {
                this.TreeModel.clearTree()
            },

            selectAll() {
                this.checkAll()
            },

            checkAll () {
                return this.TreeModel.checkAll()
            },

            createTree() {
                this.TreeModel = getTreeInstance(this.singleton, {
                    checkChildren: this.checkChildren,
                    checkedNodes: this.checkedNodes
                })

                if (this.data) {
                    this.nodes = this.TreeModel.createNodes(this.data, null, this.dict)
                }
            }
        },

        created () {
            // 获取新的树
            this.createTree()
        }
    }
</script>