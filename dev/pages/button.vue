<template>
    <div id="button">
        <demo-block title="基础用法" desc="基础的按钮用法">
            <i-button>default</i-button>
            <i-button type="primary">primary</i-button>
            <i-button type="success">success</i-button>
            <i-button type="warning">warning</i-button>
            <i-button type="danger">error</i-button>
            <i-button type="info">info</i-button>
            <i-button type="text">text</i-button>
        </demo-block>
    
        <demo-block title="禁用状态" desc="按钮不可用">
            <i-button :plain="true" :disabled="true">button</i-button>
            <i-button type="primary" :disabled="true">button</i-button>
            <i-button type="text" :disabled="true">button</i-button>
        </demo-block>
        <demo-block title="朴素按钮" desc="按钮普通状态没有颜色，只有hover时会有颜色">
            <i-button :plain="true" type="primary">primary</i-button>
            <i-button :plain="true" type="success">success</i-button>
            <i-button :plain="true" type="warning">warning</i-button>
            <i-button :plain="true" type="danger">error</i-button>
            <i-button :plain="true" type="info">info</i-button>
        </demo-block>
        <demo-block title="图标按钮" desc="带图标的按钮可增强辨识度(有文字)或节省空间(无文字)。">
            <i-button type="primary" icon="edit"></i-button>
            <i-button type="primary" icon="share"></i-button>
            <i-button type="primary" icon="delete"></i-button>
            <i-button type="primary" icon="search">搜索</i-button>
            <i-button type="primary">上传<i class="el-icon-upload el-icon-right"></i></i-button>
        </demo-block>
        <demo-block title="按钮组" desc="以按钮组的方式出现，常用于多项类似操作.">
    
            <i-button-group>
                <i-button type="primary" icon="arrow-left">上一页</i-button>
                <i-button type="primary">下一页 <i class="el-icon-arrow-right el-icon-right"></i></i-button>
            </i-button-group>
            <i-button-group>
                <i-button type="primary" icon="edit"></i-button>
                <i-button type="primary" icon="share"></i-button>
                <i-button type="primary" icon="delete"></i-button>
            </i-button-group>
        </demo-block>
        <demo-block title="加载中" desc="点击按钮后进行数据加载操作，在按钮上显示加载状态.">
            <i-button type="primary" :loading="true">加载中</i-button>
        </demo-block>
        <demo-block title="不同尺寸" desc="Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸">
            <i-button type="primary" size="large">大型按钮</i-button>
            <i-button type="primary">正常按钮</i-button>
            <i-button type="primary" size="small">小型按钮</i-button>
            <i-button type="primary" size="mini">超小按钮</i-button>
        </demo-block>
    </div>
</template>

<script>
    export default {
      
    };
</script>

<style lang="scss" scoped>
    #button {}
</style>


