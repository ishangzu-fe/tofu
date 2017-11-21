<template>
  <div id="message">
    <demo-block title="基础用法" desc="从顶部出现，3 秒后自动消失">
      <i-button :plain="true" @click="open">打开消息提示</i-button>
    </demo-block>
    <demo-block title="不同状态" desc="用来显示「成功、警告、消息、错误」类的操作反馈。">
      <i-button :plain="true" @click="success">成功</i-button>
      <i-button :plain="true" @click="warning">警告</i-button>
      <i-button :plain="true" @click="open">消息</i-button>
      <i-button :plain="true" @click="error">错误</i-button>
    </demo-block>
    <demo-block title="可关闭" desc="可以添加关闭">
      <i-button :plain="true" @click="success(true)">成功</i-button>
      <i-button :plain="true" @click="warning(true)">警告</i-button>
      <i-button :plain="true" @click="open(true)">消息</i-button>
      <i-button :plain="true" @click="error(true)">错误</i-button>
    </demo-block>
  </div>
</template>

<script>
  export default {
    methods: {
      open(s) {
        s = s || false;  
        console.log(s)      
        this.$message({
          showClose:s,                    
          message:'this is a message'
        })
      },
      success(s){
        s = s || false;
        this.$message({
          showClose:s,          
          type:'success',
          message:'success'
        });
      },
      warning(s){
        s = s || false;        
         this.$message({
          showClose:s,
          type:'warning',
          message:'warning'
        });
      },
      error(s){
        (s == true) ?  this.$message({message:'error',type:'error',showClose:true}) :  this.$message.error('error')
      }
    }
  }
</script>

