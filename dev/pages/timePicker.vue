<template>
    <div id="time-picker">
        <demo-block title="固定时间点" desc="提供几个固定的时间点供用户选择">
            <i-time-select v-model="value1" :picker-options="pickerOptions1" placeholder="选择时间"></i-time-select>
        </demo-block>
        <demo-block title="任意时间点" desc="可选择任意时间">
            <i-time-picker v-model="value2" :picker-options="pickerOptions2"></i-time-picker>
        </demo-block>
        <demo-block title="固定时间范围" desc="若先选择开始时间，则结束时间内备选项的状态会随之改变">
            <i-col :span="6">
                <i-time-select v-model="startTime" :picker-options="pickerOptions1"></i-time-select>
            </i-col>
            <i-col :span="6">
                <i-time-select v-model="endTime" :picker-options="{
                    start:'08:30',
                    step:'00:15',
                    end:'18:30',
                    minTime:startTime}"></i-time-select>
            </i-col>
        </demo-block>
        <demo-block title="任意时间范围" desc="可选择任意的时间范围">
            <i-time-picker is-range v-model="value3" placeholder="选择时间范围"></i-time-picker>
        </demo-block>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                value1:'',
                value2: new Date(2016, 9, 10, 18, 40),
                pickerOptions1:{
                    start:'08:30',
                    step:'00:15',
                    end:'18:30'
                },
                pickerOptions2:{
                    selectableRange:'18:30:00 - 20:30:00'
                },
                startTime:'',
                endTime:'',
                value3: [new Date(2017, 9, 10, 8, 40), new Date(2017, 9, 10, 9, 40)]
            }
        }
    }
</script>