<template>
    <div id="badge">
        <demo-block title="基础用法">
            <i-badge :value="12" class="item">
                <i-button size="small">评论</i-button>
            </i-badge>
            <i-badge :value="3" class="item">
                <i-button size="small">回复</i-button>
            </i-badge>
            <i-dropdown trigger="click">
                <span class="el-dropdown-link">点我查看</span>
                <i-dropdown-menu slot="dropdown">
                    <i-dropdown-item class="clearfix">
                        评论
                        <i-badge class="mark" :value="12"></i-badge>
                    </i-dropdown-item>
                    <i-dropdown-item class="clearfix">
                        回复
                        <i-badge class="mark" :value="3"></i-badge>
                    </i-dropdown-item>
                </i-dropdown-menu>
            </i-dropdown>
        </demo-block>
        <demo-block title="最大值" desc="可以自定义最大值">
            <i-badge :value="200" :max="99" class="item">
                <i-button size="small">评论</i-button>
            </i-badge>
            <i-badge :value="200" :max="10" class="item">
                <i-button size="small">评论</i-button>
            </i-badge> 
            <i-badge :value="200" :max="55" class="item">
                <i-button size="small">评论</i-button>
            </i-badge>
        </demo-block>
        <demo-block title="自定义内容" desc="可现实数字意外的内容">
            <i-badge value="new" class="item">
                <i-button size="small">评论</i-button>                
            </i-badge>
            <i-badge value="hot" class="item">
                <i-button size="small">回复</i-button>                
            </i-badge>
        </demo-block>  
        <demo-block title="小红点" desc="以红点的形式标注需要关注的内容">
            <i-badge is-dot class="item">数据查询</i-badge>
            <i-badge is-dot class="item">
                <i-button icon="share" type="primary" style="padding:10px"></i-button>
            </i-badge>
        </demo-block>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
    .item {
        margin-right: 40px;
    }
    
    .el-dropdown-link {
        cursor: pointer;
        color: #20a0ff;
    }

    .clearfix:before,
    .clearfix:after{
        display: table;
        content:""
    }

    .clearfix:after{
        clear: both;
    }

    .mark{
        margin-top:  8px;
        line-height: 1;
        float: right;
    }
</style>
