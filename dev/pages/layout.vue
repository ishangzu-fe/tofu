<template>
    <div id="layout">
        <demo-block title="基本布局" desc="使用单一分栏创建基础的栅格布局。">
            <i-row>
                <i-col :span="24">
                    <div class="grid-content bg-purple-dark"></div>
                </i-col>
            </i-row>
            <i-row>
                <i-col :span="12"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="12"><div class="grid-content bg-purple-light"></div></i-col>
            </i-row>
            <i-row>
                <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="8"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
            <i-row>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
            </i-row>
            <i-row>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
            </i-row>
        </demo-block>
        <demo-block title="分栏间隔" desc="分栏之间存在间隔">
            <i-row :gutter="20">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
        </demo-block>
        <demo-block title="混合布局" desc="通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。">
            <i-row :gutter="20" class="mt20">
                <i-col :span="16"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="16"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
        </demo-block>
        <demo-block title="分栏偏移" desc="支持偏移指定的栏数">
            <i-row :gutter="20" class="mt20">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
        </demo-block>
        <demo-block title="对齐方式" desc="对分栏进行灵活的对齐。">
            <i-row type="flex" class="row-bg">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
            <i-row type="flex" class="row-bg" justify="center">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
            <i-row type="flex" class="row-bg" justify="end">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
            <i-row type="flex" class="row-bg" justify="space-between">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
            <i-row type="flex" class="row-bg" justify="space-around">
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
                <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
            </i-row>
        </demo-block>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss" scoped>
    .el-row{
        margin-bottom: 20px;

        &:last-child{
            margin-bottom: 0;
        }

        &.mt20 {
            margin-bottom: -20px;

            .el-col{
                margin-bottom: 20px;
            }
        }
    }

    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>