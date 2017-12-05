<template>
    <div class="tree">
        <node
            v-for="node in nodes"
            :key="node.id"
            :node="node"
            @check="emitCheck"
        ></node>
    </div>
</template>

<script>
    import getTreeSingleton from './model/tree'
    import Node from './node'

    const TreeModel = getTreeSingleton()

    export default {
        name: 'tree',

        components: {
            Node
        },

        props: {
            data: Array,
            dict: Object
        },

        data () {
            return {
                nodes: []
            }
        },

        methods: {
            emitCheck (checkedNodes) {
                this.$emit('change', checkedNodes)
            },

            clear () {
                TreeModel.clearTree()
            }
        },

        created () {
            if (this.data) {
                this.nodes = TreeModel.createNodes(this.data, null, this.dict);
            }
        }
    }
</script>