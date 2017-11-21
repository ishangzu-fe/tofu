<template>
  <div id="alert">
    <demo-block title="基本用法" desc="页面中的非浮层元素，不会自动消失。">
      <i-alert title="成功提示的文案" type="success"></i-alert>
      <i-alert title="消息提示的文案" type="info"></i-alert>
      <i-alert title="警告提示的文案" type="warning"></i-alert>
      <i-alert title="错误提示的文案" type="error"></i-alert>
    </demo-block>
    <demo-block title="自定义关闭按钮" desc="自定义关闭按钮为文字或其他符号。">
      <i-alert title="不可关闭的alert" type="success" :closable="false"></i-alert>
      <i-alert title="自定义的close-text" type="info" close-text="知道了"></i-alert>
      <i-alert title="设置了回调的alert" type="warning" @close="hello"></i-alert>      
    </demo-block>
    <demo-block title="带有icon" desc="表示某种状态时提升可读性。">
      <i-alert title="成功提示的文案" type="success" show-icon></i-alert>
      <i-alert title="消息提示的文案" type="info" show-icon></i-alert>
      <i-alert title="警告提示的文案" type="warning" show-icon></i-alert>
      <i-alert title="错误提示的文案" type="error" show-icon></i-alert>
    </demo-block>
    <demo-block title="带有辅助性文字介绍" desc="包含标题和内容，解释更详细的警告。">
      <i-alert title="title文字" description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……" type="success"></i-alert>
    </demo-block>
    <demo-block title="带有 icon 和辅助性文字介绍">
      <i-alert title="成功提示的文案"  description="文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明" type="success" show-icon></i-alert>
      <i-alert title="消息提示的文案"  description="文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明" type="info" show-icon></i-alert>
      <i-alert title="警告提示的文案"  description="文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明" type="warning" show-icon></i-alert>
      <i-alert title="错误提示的文案"  description="文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明" type="error" show-icon></i-alert>
    </demo-block>
  </div>  
</template>
<script>
export default {
  methods:{
    hello(){
      alert('hello world')
    }
  }
}
</script>
<style scoped>
  #alert .module .el-alert{
    margin-top: 20px;
  }

  #alert .module .el-alert:first-child{
    margin-top: 0px;
  }
</style>


