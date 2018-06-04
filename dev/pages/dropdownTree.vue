<template>
    <div id="dropdown-tree">
        <demo-block title="基础用法">
            <i-dropdown-tree ref="tree" 
                            size="normal" 
                            placeholder="请输入占位字符" 
                            v-model="selectVal"
                            :data="depart" 
                            :dict="treeDict" 
                            :checkedNodes="dep">
            </i-dropdown-tree>
            <i-button @click.stop="cleanTree">清空</i-button>    
        </demo-block>
    </div>
</template>

<script>
    import depart from '../depart';
    export default {
        data() {
            return {
                treeTitle: 'title',
                treeDict: {
                    label: 'text',
                    childNodes: 'children'
                },
                depart: depart,
                dep: [],
                selectVal:['00000000000000000000000000000000']
            }
        },
        methods: {
            handleChange (checkedNodes) {
                console.log('选中的节点：', checkedNodes);
            },
            cleanTree() {
                this.tree.clean();
            },
            selectTreeAllNodes() {
                this.tree.selectAll();
            }
        },
        mounted(){
            this.tree = this.$refs.tree.getTree(); // 获取树实例
        }
    }
</script>

