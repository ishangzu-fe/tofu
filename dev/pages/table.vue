<template>
    <div id="table">
        <demo-block title="基础表格">
            <i-table :data="tableData1" style="width:100%">
                <i-table-column prop="date" label="日期" width="180"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址" show-tooltip-when-overflow></i-table-column>
            </i-table> 
        </demo-block>
        <demo-block title="带斑马纹表格">
            <i-table :data="tableData1" stripe style="width:100%">
                <i-table-column prop="date" label="日期" width="180"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址"></i-table-column>
            </i-table>
        </demo-block>  
        <demo-block title="带边框表格">
            <i-table :data="tableData1" border style="width:100%">
                <i-table-column prop="date" label="日期" width="180"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址"></i-table-column>
            </i-table>
        </demo-block>  
    </div>
</template>

<script>
    import data from '../data/tableData';
    
    export default {
        data(){
            return {
                tableData1:data.data1
            }
        }
    }
</script>

