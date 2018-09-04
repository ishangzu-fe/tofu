<template>
    <div id="imgList">
        <div class="close"></div>
        <div class="close2"></div>
        <demo-block title="基础用法">
            <i-img-list v-model="files" @delete="imgDel"></i-img-list>
            <i-button @click="add">添加图片</i-button>
        </demo-block>
        <demo-block title="可设置图片描述">
            <i-img-list v-model="filesList"  :props="opt" perfix="http://img.ishangzu.com/" :has-input="true"></i-img-list>
            <i-button @click="show2">查看数据</i-button>

        </demo-block>
        <demo-block title="可设置图片类型">
            <i-img-list v-model="files" :props="opt1" :has-select="true" :type-options="options"></i-img-list>
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
        <demo-block title="测试">
            <i-img-list v-model="imgs" :props="opt" ref="img"></i-img-list>
            <i-button @click.stop="addList">添加图片</i-button>
        </demo-block>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                opt:{
                    url:'src',
                    name:'text'
                },
                opt1:{
                    url:'url'
                },
                filesList:[
                    {
                        src:'erp/2017/11/7/20/81586f91-06b5-445e-a5c5-eaf173500fb3.JPG',
                        text:'图片1',
                        infos:['test-hhh','1981-01-01']
                    },
                    {
                        src:'erp/2017/11/7/20/35f69a82-cb4b-4eda-8bd5-ed2326105e1a.JPG',
                        text:'图片2',
                        infos:['test-fffff','1981-01-01']
                    }
                ],
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
                imgs:[],
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
            },
            show2(){
                console.log(this.filesList)
            },
            addList(){
                let list = [
                    {
                        src:'http://img.ishangzu.com/erp/2017/11/7/20/81586f91-06b5-445e-a5c5-eaf173500fb3.JPG',
                        img_id:1
                    },
                    {
                        src:'http://img.ishangzu.com/app/2017/11/8/0/81660b63-379d-4255-9b56-f4a62e008c74.jpg',                        
                        img_id:2
                    }
                ]
                this.imgs = list;
            },
            imgDel(index,obj){
                console.log(index, obj);
            }
        }
    }
</script>
<style lang="scss">
    .img-list {
        li {
            list-style: none;
        }
    }
    .close{
        width: 16px;
        height: 16px;
        background: red;
        border-radius: 50%;
        position: relative;
        margin-bottom: 10px
    }

    .close::before{
        content:' ';
        height: 2px;
        width: 10px;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        top:50%;
        left: 50%;
        margin-top: -1px;
        margin-left: -5px;
    }

    .close2{
        width: 16px;
        height: 16px;
        background: red;
        border-radius: 50%;
        position: relative;
    }

    .close2::before{
         content:' ';
        height: 2px;
        width: 10px;
        background: #fff;
        position: absolute;
        top:50%;
        left: 50%;
        margin-top: -1px;
        margin-left: -5px;
        transform: rotate(45deg);
    }

    .close2::after{
         content:' ';
        height: 2px;
        width: 10px;
        background: #fff;
        position: absolute;
        top:50%;
        left: 50%;
        margin-top: -1px;
        margin-left: -5px;
        transform: rotate(-45deg);
    }
</style>


