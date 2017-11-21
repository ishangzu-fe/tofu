<template>
    <div id="checkbox">
        <demo-block title="基础用法" desc="单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。">
            <i-checkbox v-model="checked">选择项</i-checkbox>
        </demo-block>
        <demo-block title="禁用状态" desc="多选框不可用状态">
            <i-checkbox v-model="checked1" disabled>选择项</i-checkbox>
            <i-checkbox v-model="checked2" disabled>选择项</i-checkbox>
        </demo-block>
        <demo-block title="多选框组" desc="适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。">
            <i-checkbox-group v-model="checkList">
                <i-checkbox label="复选框 A"></i-checkbox>
                <i-checkbox label="复选框 B"></i-checkbox>
                <i-checkbox label="复选框 C"></i-checkbox>
                <i-checkbox label="禁用" disabled></i-checkbox>
                <i-checkbox label="选中且禁用" disabled></i-checkbox>
            </i-checkbox-group>
        </demo-block>
        <demo-block title="indeterminate 状态" desc="indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果">
            <i-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</i-checkbox>
            <div style="margin: 15px 0"></div>
            <i-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <i-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</i-checkbox>
            </i-checkbox-group>
        </demo-block>
    </div>
</template>
<script>
    const cityOptions = ['上海','北京','广州','深圳']
    export default {
        data(){
            return {
                checked:true,
                checked1:false,
                checked2:true,
                checkList:['选中且禁用','复选框 A'],
                checkAll:true,
                checkedCities: ['上海','北京'],
                cities:cityOptions,
                isIndeterminate:true
            }
        },
        methods:{
            handleCheckAllChange(event){
                this.checkedCities = event.target.checked ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value){
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>