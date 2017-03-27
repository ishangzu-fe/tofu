<template>
    <div class="el-tree-node"
         @click.stop="handleClick"
         :class="{ expanded:childNodeRendered && expanded,'is-current':$selectTree.current === _self }">
        <div class="el-tree-node-content"
             :style="{'padding-left':node.level * 16 + 'px'}"
             @click="handleExpandIconClick">
            <span class="el-tree-node-expand-icon"
                  :class="{ 'is-leaf':node.isLeaf,expanded: !node.isLeaf && expanded }">
            </span>
            <i-checkbox v-if="showCheckbox"
                        v-model="node.checked">
            </i-checkbox>
            <span v-if="node.loading"
                  class="el-tree-node-icon el-icon-loading">
            </span>
            <span class="el-tree-node-label">{{node.label}} </span>
        </div>
        <CollapseTransition>
            <div class="el-tree-node-children" v-show="expanded">
                <el-select-tree-node v-for="child in node.childNodes" :node="child"></el-select-tree-node>
            </div>
        </CollapseTransition>
    </div>
</template>
<script>
    import Emitter from '../../../utils/emitter';
    import CollapseTransition from '../../tree/src/transition';
    import {Checkbox} from '../../checkbox';

    export default{
        name:'el-select-tree-node',
        mixins:[Emitter],
        props:{
            node:{
                default(){
                    return {};
                }
            },
            props:{},
            renderContent:Function
        },
        components:{
            'i-checkbox':Checkbox,
            CollapseTransition
        },
        data(){
            return {
                $selectTree:null,
                expanded:false,
                childNodeRendered:false,
                showCheckbox:false,
                oldChecked:null,
                oldIndeterminate:null
            }
        },
        watch:{
            'node.indeterminate'(val){
                this.handleSelectChange(this.node.checked,val);
            },
            'node.checked'(val){
                this.handleSelectChange(val,this.node.indeterminate);
            }
        },
        methods:{
            handleSelectChange(checked,indeterminate){
                if(this.oldChecked !== checked && this.oldIndeterminate !== indeterminate){
                    this.$selectTree.$emit('check-change',this.node.data,checked,indeterminate);
                }
                this.oldChecked = checked;
                this.indeterminate = indeterminate;
            },
            handleClick(){
                this.$selectTree.currentNode = this;
            },
            handleExpandIconClick(event){
                let target = event.target;

                if(target.tagName.toUpperCase() !== 'DIV' &&
                    target.parentNode.nodeName.toUpperCase() !== 'DIV' ||
                    target.nodeName.toUpperCase() === 'LABEL'){
                    return;
                }
                if(this.expanded){
                    this.node.collapse();
                    this.expanded = false;
                }else{
                    this.node.expand(() => {
                        this.expanded = true;
                        this.childNodeRendered = true;
                    });
                }
                this.$selectTree.$emit('node-click',this.node.data,this.node,this);
            },
            handleSelectChange(checked,indeterminate){
                if(this.oldChecked !== checked && this.oldIndeterminate !== indeterminate){
                    this.dispatch('select-tree-option','check-change',[this.node.data,checked,indeterminate]);
                    this.dispatch('select-tree','set-data',[this.node.data,checked]);
                }
            }
        },
        created(){
            var parent = this.$parent;

            if(parent.$isSelectTree){
                this.$selectTree = parent;
            }else{
                this.$selectTree = parent.$selectTree
            }

            const tree = this.$selectTree;
            const props = this.props || {};
            const childrenKey = props['children'] || 'children';

            this.$watch(`node.data.${childrenKey}`,() => {
               this.node.updateChildren();
            });

            if(!tree){
                console.warn('can\'t find node\'s tree.');
            }

            this.showCheckbox = tree.showCheckbox;
        }
    }
</script>