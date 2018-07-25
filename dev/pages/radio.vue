<template>
    <div id="radio">
        <demo-block title="按钮样式">
             <i-radio-group v-model="uploadType" size="small">
                <i-radio-button label="微信上传"></i-radio-button>
                <i-radio-button label="电脑上传"></i-radio-button>
            </i-radio-group>
        </demo-block>
        
    </div>
</template>
<script>
    import data from '../data/radio.json';
    export default {
        data(){
            return {
                list:data,
                uploadType:'电脑上传'
            }
        },
        methods:{
           
        }
    }
</script>
<style lang="scss" scoped>
    .row-child-item{
         margin-left: 30px;

    }
</style>
