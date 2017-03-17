<template>
    <div class="el-tab-menu" >
        <span class="button el-icon-arrow-left"></span>
        <div class="el-tab-menu-wrap" ref="main">
            <tabMenuItem v-for="tab in data" :tab="tab" :active="activeIndex == tab.id" />
        </div>
        <span class="button el-icon-arrow-right"></span>
    </div>
</template>
<script>
    import tabMenuItem from './tab-menu-item';

    export default{
        name:'i-tab-menu',
        props:{
            data:{
                type:Array,
                default:[]
            },
            activeIndex:{
                type:String,
                required:true
            }
        },
        components:{
            tabMenuItem
        },
        watch:{
            activeIndex(val){
                console.log(val);
            }
        },
        created(){
            this.$on('moveTab',(val) => {
                console.log(val);
            })

        },
        methods:{

        }
    }
</script>