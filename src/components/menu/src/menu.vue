<template>
    <div class="el-menu">
        <i-menu-node v-for="node in data" :node="node"></i-menu-node>
    </div>
</template>
<script>
    import MenuNode from './menu-node'

    export default{
        name:'menu',
        componentName:'name',
        props:{
            data:{
                type:Array
            }
        },
        components:{
            'i-menu-node':MenuNode
        },
        created(){

        }
    }
</script>