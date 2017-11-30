<template>
    <div id="switch">
        <demo-block title="基本用法">
            <i-switch v-model="value1" on-text="" off-text=""></i-switch>

            <i-switch v-model="value2" on-color="#13ce66" off-color="#ff4949"></i-switch>

            <i-tooltip :content="'Switch value:' + value3" placement="top">
                <i-switch v-model="value3" on-color="#13ce66" off-color="#ff4949" on-value="100" off-value="0"></i-switch>
            </i-tooltip>
        </demo-block>
        <demo-block title="禁用状态">
            <i-switch v-model="value1" on-text="" off-text="" disabled></i-switch>

            <i-switch v-model="value2" on-color="#13ce66" off-color="#ff4949" disabled></i-switch>
        </demo-block>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                value1:true,
                value2:true,
                value3:'100'
            }
        }
    }
</script>