<template>
    <div id="input">
        <demo-block title="基础用法">
            <i-col :span="4">
                <i-input v-model="input" placeholder="请输入内容"  ></i-input>
            </i-col>
        </demo-block>
        <demo-block title="禁用状态">
            <i-col :span="4">
                <i-input v-model="input2" placeholder="请输入内容" :disabled="true"></i-input>
            </i-col>
        </demo-block>
        <demo-block title="带icon的输入框" desc="带有图标标记输入类型">
            <i-col :span="4">
                <i-input v-model="input3" placeholder="请输入内容" icon="time"></i-input>
            </i-col>
        </demo-block>
        <demo-block title="文本域" desc="可调整大小，勇于输入多行文本信息">
            <i-col :span="8">
                <i-input type="textarea" :autosize="{minRows:2,maxRows:4}" placeholder="请输入内容" v-model="input4"></i-input>
            </i-col>
        </demo-block>
        <demo-block title="复合型输入框" desc="可前置或后置元素，一般为标签或按钮">
            <i-col :span="6">
                <i-input placeholder="请输入内容" v-model="input5">
                    <template slot="prepend">Http://</template>
                </i-input>
            </i-col>
            <i-col :span="6" :offset="1">
                <i-input placeholder="请输入内容" v-model="input6">
                    <template slot="append">.com</template>
                </i-input>
            </i-col>
            <i-col :span="8" :offset="1">
                <i-input placeholder="请输入内容" v-model="input7">
                    <i-select v-model="select" slot="prepend" placeholder="请选择">
                        <i-option label="西湖区" value="1"></i-option>
                        <i-option label="萧山区" value="2"></i-option>
                        <i-option label="滨江区" value="3"></i-option>
                    </i-select>
                    <i-button slot="append" icon="search"></i-button>
                </i-input>
            </i-col>
        </demo-block>
        <demo-block title="不同尺寸">
            <i-row :gutter="10">
                <i-col :span="6">
                    <i-input size="large" placeholder="请输入内容"></i-input>
                </i-col>
                <i-col :span="6">
                    <i-input placeholder="请输入内容"></i-input>
                </i-col>
                <i-col :span="6">
                    <i-input placeholder="请输入内容" size="small"></i-input>
                </i-col>
                <i-col :span="6">
                    <i-input placeholder="请输入内容" size="mini"></i-input>
                </i-col>
            </i-row>
        </demo-block>
    </div>
</template>
<script>

    export default {
        data(){
            return {
                input:'fff',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                input7:'',
                select:'',
                test:this.value
            }
        },
        props:{
          value:[String,Number]
        }
    }
</script>
<style lang="scss" scoped>
    .el-select{
        width: 90px;

    }
</style>