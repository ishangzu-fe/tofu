<template>
    <div id="imgList">
        <demo-block title="基础用法">
            <i-img-list v-model="files"></i-img-list>
            <i-button @click="add">添加图片</i-button>
        </demo-block>
        <demo-block title="可设置图片描述">
            <i-img-list v-model="files" :has-input="true"></i-img-list>
            <i-button @click="show">查看数据</i-button>

        </demo-block>
        <demo-block title="可设置图片类型">
            <i-img-list v-model="files" :has-select="true" :type-options="options"></i-img-list>
            <i-button @click="show">查看数据</i-button>

        </demo-block>
        <demo-block title="图片排序">
            <i-img-list v-model="files2" :order="true" ></i-img-list>
        </demo-block>
        <demo-block title="禁止图片删除">
            <i-img-list v-model="files2" :disabled="true" ></i-img-list>
        </demo-block>
        <demo-block title="图片删除提示">
            <i-img-list v-model="files2" :delete-tip="true" ></i-img-list>
        </demo-block>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                files:[
                    {
                        url:'http://img.ishangzu.com/erp/2017/11/7/20/81586f91-06b5-445e-a5c5-eaf173500fb3.JPG',
                        name:'图片1',
                        type:'',
                        infos:['test-hhh','1981-01-01']
                    },
                    {
                        url:'http://img.ishangzu.com/erp/2017/11/7/20/35f69a82-cb4b-4eda-8bd5-ed2326105e1a.JPG',
                        name:'图片2',
                        type:'',
                        infos:['test-fffff','1981-01-01']
                    }
                ],
                files2:[
                    {
                        url:'http://img.ishangzu.com/erp/2017/11/7/20/81586f91-06b5-445e-a5c5-eaf173500fb3.JPG',
                        infos:['test-hhh','1981-01-01']
                    },
                    {
                        url:'http://img.ishangzu.com/erp/2017/11/7/20/35f69a82-cb4b-4eda-8bd5-ed2326105e1a.JPG',
                        infos:['test-fffff','1982-01-01']
                    },
                    {
                        url:'http://img.ishangzu.com/app/2017/11/8/0/81660b63-379d-4255-9b56-f4a62e008c74.jpg',
                        infos:['test-fffff','1983-01-01']                        
                    }
                ],
                options:[
                    {label:'one',value:'one'},
                    {label:'two',value:'two'},
                    {label:'three',value:'three'}
                ]
            }
        },
        methods:{
            add(){
                this.files.push({
                    url:'http://img.ishangzu.com/erp/2017/11/7/20/35f69a82-cb4b-4eda-8bd5-ed2326105e1a.JPG',
                    name:'图片test',
                    infos:['test-fffff','1981-01-01']
                });
            },
            show(){
                console.log(this.files)
            }
        }
    }
</script>
<style scoped>
    
</style>


