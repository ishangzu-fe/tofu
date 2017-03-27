<template>
    <div class="el-tree">
        <i-node v-for="child in SelectTree.root.childNodes" :node="child" :props="props"></i-node>
    </div>
</template>
<script>
    import Node from './node';
    import SelectTree from './model/tree';

    export default{
        name:'el-select-tree-option',
        componentName:'select-tree-option',
        props:{
            data:{
                type:Array
            },
            showCheckbox:{
                type:Boolean,
                default:false
            },
            props:{
                default(){
                    return {
                        children:'children',
                        label:'label',
                        value:'value',
                        icon:'icon'
                    }
                }
            },
            lazy:{
                type:Boolean,
                default:false
            },
            highlightCurrent:Boolean,
            load:{
                type:Function
            },
            checkStrictly:{
                type:Boolean,
                default:true
            }
        },
        created(){
            this.$isSelectTree = true;

            this.SelectTree = new SelectTree({
                data:this.data,
                lazy:this.lazy,
                props:this.props,
                load:this.load,
                checkStrictly:this.checkStrictly,
                defaultCheckedKeys:this.defaultCheckedKeys,
                defaultExpandedKeys:this.defaultExpandedKeys,
                autoExpandParent:this.autoExpandParent,
                defaultExpandAll:this.defaultExpandAll
            });

        },
        data(){
            return {
                SelectTree:{},
                currentNode:null
            };
        },
        components:{
            'i-node':Node
        },
        computed:{
            children:{
                set(value){
                    this.data = value;
                },
                get(){
                    return this.data;
                }
            }
        },
        watch:{
            data(newVal){
                this.SelectTree.root.setData(newVal);
            }
        },
        methods:{
            getCheckedNodes(leafOnly){
                return this.SelectTree.getCheckedNodes(leafOnly);
            }
        }
    }
</script>