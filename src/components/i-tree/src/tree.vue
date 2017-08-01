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
    import getTreeSingleton from './model/tree'
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
            }
        },

        data () {
            return {
                TreeModel: getTreeSingleton(),
                nodes: []
            }
        },

        methods: {
            emitCheck (checkedNodes) {
                this.$emit('change', checkedNodes)
            },

            clear () {
                this.TreeModel.clearTree()
            },

            checkAll () {
                return this.TreeModel.checkAll()
            }
        },

        created () {
            if (this.data) {
                this.nodes = this.TreeModel.createNodes(this.data, null, this.dict);
            }
        }
    }
</script>