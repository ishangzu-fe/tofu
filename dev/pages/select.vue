<template>
    <div id="select">
        <demo-block title="基础用法" desc="适用广泛的基础单选">
            <i-col :span="4">
                <i-select v-model="value" placeholder="请选择">
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></i-option>
                </i-select>
            </i-col>
        </demo-block>
        <demo-block title="禁用状态">
            <i-col :span="4">
                <i-select v-model="value" placeholder="请选择" disabled>
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></i-option>
                </i-select>
            </i-col>
        </demo-block>
        <demo-block title="可清空单选" desc="包含清空按钮，可将选择器清空为初始状态">
            <i-col :span="4">
                <i-select v-model="value2" clearable placeholder="请选择">
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></i-option>
                </i-select>
            </i-col>
        </demo-block>
        <demo-block title="基础多选" desc="适用性较广的基础多选，用 Tag 展示已选项">
            <i-col :span="4">
                <i-select v-model="value3" multiple placeholder="请选择">
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></i-option>
                </i-select>
            </i-col>
        </demo-block>
        <demo-block title="自定义模板" desc="可自定义备选项">
            <i-col :span="4">
                <i-select v-model="value4" placeholder="请选择">
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                        <span style="float:left">{{item.label}}</span>
                        <span style="float: right;color:#8492a6;font-size: 13px">{{item.value}}</span>
                    </i-option>
                </i-select>
            </i-col>
        </demo-block>
        <demo-block title="分组" desc="备选项进行分组展示">
            <i-col :span="4">
                <i-select v-model="value5" placeholder="请选择">
                    <i-option-group v-for="group in options3" :key="group.label" :label="group.label">
                        <i-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" ></i-option>
                    </i-option-group>
                </i-select>
            </i-col>
        </demo-block>
        <demo-block title="可搜索" desc="">
            <i-col :span="4">
                <i-select v-model="value6" filterable placeholder="请选择">
                    <i-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></i-option>
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
                    value: '选项6',
                    label: '北京烤鸭',
                    disabled:true
                }, {
                    value: '选项7',
                    label: '北京烤鸭'
                }, {
                    value: '选项8',
                    label: '北京烤鸭'
                }, {
                    value: '选项9',
                    label: '北京烤鸭'
                }, {
                    value: '选项10',
                    label: '北京烤鸭'
                }],
                options3: [{
                    label: '热门城市',
                    options: [{
                        value: 'Shanghai',
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                    label: '城市名',
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
                value:'',
                value2:'',
                value3:[],
                value4:'',
                value5:'',
                value6:''
            }
        }
    }
</script>