<template>
 <div id="card">
  <demo-block title="基础用法">
   <i-col :span="10">
    <i-card class="box-card">
     <div slot="header" class="clearfix">
      <span style="line-height: 36px">box标题</span>
      <i-button style="float: right" type="primary">操作按钮</i-button>
     </div>
     <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o}}
     </div>
    </i-card>
   </i-col>
  </demo-block>
  <demo-block title="简单卡片" desc="卡片只有内容区域">
   <i-col :span="10">
    <i-card class="box-card">
     <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o}}
     </div>
    </i-card>
   </i-col>
  </demo-block>
  <demo-block title="带图片" desc="可配置定义更丰富的内容展示">
   <i-col :span="10">
    <i-card :body-style="{padding:'0px'}">
     <img src="http://img.ishangzu.com/erp/2017/11/7/20/81586f91-06b5-445e-a5c5-eaf173500fb3.JPG" class="image" alt="">
     <div style="padding:14px">
      <span>舒适的房子</span>
      <div class="bottom clearfix">
       <time class="time">{{currentDate}}</time>
       <i-button type="text" class="button">操作按钮</i-button>
      </div>
     </div>
    </i-card>
   </i-col>
  </demo-block>
 </div>
</template>
<script>
 export default{
  data(){
      return {
          currentDate:new Date().toLocaleString()
      }
  }
 }
</script>
<style lang="scss" scoped>
 .text{
  font-size: 14px;
 }

 .item{
  padding:18px 0;
 }

 .image{
  width: 100%;
  display: block;
 }

 .time{
  font-size: 13px;
  color:#999;
 }

 .bottom{
  margin-top: 13px;
  line-height: 12px;
 }

 .button{
  padding:0;
  float: right;
 }

 .clearfix:before,
 .clearfix:after {
  display: table;
  content: "";
 }
 .clearfix:after {
  clear: both
 }

</style>