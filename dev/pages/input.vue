<template>
    <div id="input">
        <demo-block title="基础用法">
            <i-col :span="4">
                <i-input v-model="input" placeholder="请输入内容"></i-input>
            </i-col>
        </demo-block>
        <demo-block title="禁用状态"></demo-block>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                input:''
            }
        }
    }
</script>