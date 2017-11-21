<template>
    <div class="hello">
        <div style="width:300px">
            hello world
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name:'',
                list:[]
            }
        },
        mounted(){
            for(let i=0;i<20;i++){
                this.list.push({name:'name'+i,key:'key'+i});
            }
        }
    }
</script>