<template>
    <div id="select">
        <demo-block title="基础用法" desc="适用广泛的基础单选">
            <i-col :span="4">
                <i-select v-model="value" placeholder="请选择">
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></i-option>
                </i-select>
            </i-col>
        </demo-block>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value:''
            }
        }
    }
</script>