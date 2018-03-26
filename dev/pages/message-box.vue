<template>
    <div id="message-box">
        <demo-block title="消息提示">
            <i-button type="text" @click.stop="open1">打开</i-button>
        </demo-block>
        <demo-block title="确认消息">
            <i-button type="text" @click.stop="open2">打开</i-button>
        </demo-block>
    </div>
</template>

<script>
    export default {
        methods: {
            open1() {
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback:action => {
                        this.$message({
                            type: 'info',
                            message: ` 嘿嘿嘿: ${action}`
                        })
                    }
                })
                
            },
            open2(){
                this.$confirm('是否永久删除该文件','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                }).catch(() => {
                    console.log('fff')
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    })
                });
            }
        }
    }
</script>

