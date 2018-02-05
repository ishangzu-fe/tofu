<template>
  <div id="dialog">
      <demo-block title="基础用法">
          <i-button @click.stop="dialog1 = true">打开dialog</i-button>
          <i-dialog v-model="dialog1" title="dialog">
              <div>这是一个dialog</div>
          </i-dialog>
      </demo-block>
      <demo-block title="嵌套">
          <i-button @click.stop="dialog2 = true">打开dialog</i-button>
          <i-dialog v-model="dialog2" title="dialog" >
              <div>
                  <i-button @click.stop="dialog3 = true">打开嵌套dialog</i-button>
                  <i-dialog v-model="dialog3" title="嵌套" append-to-body>
                      <div @click.stop="show">嵌套</div>
                  </i-dialog>
              </div>
          </i-dialog>
      </demo-block>
  </div>
</template>
<script>
export default {
  data(){
      return {
          dialog1:false,
          dialog2:false,
          dialog3:false
      }
  },
  methods:{
      show(){
          this.$confirm('确定删除', '提示', {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'info'
            }).then(() => {
                this.$message({
                    type:'success',
                    message:'删除成功'
                });
            }).catch(() => {
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
      }
  }
}
</script>

