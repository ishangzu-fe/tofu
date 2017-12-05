<template>
    <div class="iu-select-tree">
        <i-dropdown-tree size="small" placeholder="请输入内容" :title="title">
            <tree :data="data" @change="handleChangeNodes"></tree>
        </i-dropdown-tree>
    </div>
</template>

<script>
import Tree from './tree';
import IDropdownTree from '../../dropdown-tree';

export default {
    name: 'select-tree',

    components: {
        IDropdownTree,
        Tree
    },

    props: {
        data: Array
    },

    data () {
        return {
            title: ''
        }
    },

    methods: {
        handleChangeNodes (checkedNodes) {
            this.title = checkedNodes.map(node => {
                return node.label;
            }).join(',');
        }
    }
}
</script>

<style>

</style>
