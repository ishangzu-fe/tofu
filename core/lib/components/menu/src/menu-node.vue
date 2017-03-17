<template>
    <div class="el-menu-node"
         @click.stop="opened = !opened"
         :class="{'is-opened':opened}" >
        <div class="el-menu-node-content" :style="{'padding-left':(level-1) * 10 + 'px'}">
            <span class="el-menu-node-icon" :class="node.icon"></span>
            <span class="el-menu-node-text" @click.stop="menuClick">{{node.text}}</span>
            <span class="el-menu-node-opened-icon " :class="{'el-icon-arrow-down':hasChild}"></span>
        </div>
        <collapse-transition >
            <div class="el-menu-node-children" v-show="opened" >
                <el-menu-item v-for="child in node.children" :node="child" :level="level+1"></el-menu-item>
            </div>
        </collapse-transition>
    </div>
</template>
<script>
    import CollapseTransition from './transition';

    export default {
        name:'el-menu-item',
        componentName:'menu-item',
        components:{
            CollapseTransition
        },
        props:{
            node:{
                default(){
                    return {};
                }
            },
            level:{
                type:Number,
                default:1
            }
        },
        data(){
            return {
                opened:false,
                hasChild:true
            }
        },
        methods:{
            menuClick(){
                console.log(this.node.text);
            }
        },
        mounted(){
            if(!this.node.children){
                this.hasChild = false
            }
        }
    }
</script>