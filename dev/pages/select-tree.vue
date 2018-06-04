<template>
  <div id="select-tree">
        <demo-block title="基础用法">
            <i-select-tree v-model="selectVal" >
                <i-select-tree-option :data="depart" :dict="treeDict" :checkChildren="false"></i-select-tree-option>
            </i-select-tree> 
            <i-button @click.stop="test">赋值</i-button>
        </demo-block>
    </div>
</template>
<script>
import depart from '../depart';
export default {
    data(){
        return {
            treeDict: {
                label: 'text',
                childNodes: 'children'
            },
            depart: [],
            selectVal:[]
            
        }
    },
    methods:{
        test(){
            this.$set(this,'selectVal',['00000000000000000000000000000000'])
        }
    },
    mounted(){
        setTimeout(() => {
            this.$set(this,'depart',depart);
        },1000)
    }
}
</script>

