<template>
    <div id="affix">
        <demo-block title="固定在顶部">
            <i-affix>
                <i-button>顶部</i-button>
            </i-affix>
        </demo-block>
        <demo-block title="固定在距离顶部50px的位置">
            <i-affix :offset-top="50" @change="change">
                <i-button>顶部50px</i-button>
            </i-affix>
        </demo-block>

    </div>
</template>

<script>
    export default {
        methods:{
            change(status){
                this.$message('悬浮状态:' + status)
            }
        }
    }
</script>

<style scoped>
    #affix {
        height: 2000px;
    }
</style>

