<template>
    <div id="date-picker">
        <demo-block title="选择日">
            <i-row :gutter="10">
                <i-col :span="6">
                    <div class="is-left">默认</div>
                    <i-date-picker v-model="value1" type="date" placeholder="请选择日期" :picker-options="pikcerOptions1" @change="handleChange"></i-date-picker>
                </i-col>
                <i-col :span="6">
                    <div class="is-left">带快捷选项</div>
                    <i-date-picker v-model="value2" type="date" align="right" placeholder="请选择日期" :picker-options="pickerOptions2"></i-date-picker>
                </i-col>
            </i-row>
        </demo-block>
        <demo-block title="其他日期单位" desc="通过扩展基础的日期选择，可以选择周、月、年">
            <i-row :gutter="10">
                <i-col :span="6">
                    <div class="is-left">周</div>
                    <i-date-picker v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周"></i-date-picker>
                </i-col>
                <i-col :span="6">
                    <div class="is-left">月</div>
                    <i-date-picker v-model="value4" type="month" placeholder="选择月"></i-date-picker>
                </i-col>
                <i-col :span="6">
                    <div class="is-left">年</div>
                    <i-date-picker v-model="value5" type="year" placeholder="选择年"></i-date-picker>
                </i-col>
            </i-row>
        </demo-block>
        <demo-block title="选择日期范围" desc="可在一个选择器中便捷地选择一个时间范围">
            <i-row :gutter="10">
                <i-col :span="6">
                    <div class="is-left">默认</div>
                    <i-date-picker v-model="value6" type="daterange" placeholder="请选择日期范围"></i-date-picker>
                </i-col>
                <i-col :span="6">
                    <div class="is-left">带快捷选项</div>
                    <i-date-picker v-model="value7" type="daterange" align="right" placeholder="请选择日期" :picker-options="pickerOptions3"></i-date-picker>
                </i-col>
            </i-row>
        </demo-block>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                value5:'',
                value6:[],
                value7:[],
                pikcerOptions1:{
                    disabledDate(time){
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions2:{
                    shortcuts:[{
                        text:'今天',
                        onClick(picker){
                            picker.$emit('pick',new Date())
                        }
                    },{
                        text:'昨天',
                        onClick(picker){
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick',date);
                        }
                    },{
                        text:'一周前',
                        onClick(picker){
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick',date);
                        }
                    }]
                },
                pickerOptions3:{
                    shortcuts:[{
                        text:'最近一周',
                        onClick(picker){
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick',[start,end]);
                        }
                    },{
                        text:'最近一个月',
                        onClick(picker){
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick',[start,end]);
                        }
                    },{
                        text:'最近三个月',
                        onClick(picker){
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick',[start,end]);
                        }
                    }]
                }
            }
        },
        methods:{
            handleChange(val){
                console.log(val,this.value1);
            }
        },
        mounted(){
            this.value1 = new Date('2021-01-15')
        }
    }
</script>
<style lang="scss" scoped>
    #date-picker{
        .is-left{
            text-align: left;
            padding-left: 30px;
            font-size: 13px;
            color: #ddd;
            margin-bottom: 10px;
        }
    }
</style>