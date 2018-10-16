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
        <demo-block title="固定列和表头">
          <i-table :data="tableData1" max-height="200" style="width:100%">
              <i-table-column prop="date" label="日期" width="200" fixed="left"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="address" label="地址"></i-table-column>
              <i-table-column fixed="right" align="center" label="操作" width="101" inline-template>
                <div>
                  <i-button type="text">详情</i-button>
                </div>
              </i-table-column>
          </i-table>
          <i-table :data="tableData1" max-height="200" style="width:100%">
              <i-table-column prop="date" label="日期" width="200" fixed="left"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="address" label="地址"></i-table-column>
              <i-table-column fixed="right" align="center" label="操作" width="100" inline-template>
                <div>
                  <i-button type="text">详情</i-button>
                </div>
              </i-table-column>
          </i-table>
          <i-table :data="tableData1" max-height="200" style="width:100%">
              <i-table-column prop="date" label="日期" width="200" fixed="left"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="name" label="姓名" width="200">
                <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              </i-table-column>
              <i-table-column prop="name" label="姓名" width="200"></i-table-column>
              <i-table-column prop="address" label="地址"></i-table-column>
              <i-table-column fixed="right" align="center" label="操作" width="101" inline-template>
                <div>
                  <i-button type="text">详情</i-button>
                </div>
              </i-table-column>
          </i-table>
        </demo-block>
        <demo-block title="合并行或列">
            <i-table :data="tableData1" border style="width:100%" :span-method="arraySpanMethod">
                <i-table-column prop="date" label="日期" width="180"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址"></i-table-column>
            </i-table>
            <i-table :data="tableData1" border style="width:100%" :span-method="objectSpanMethod">
                <i-table-column prop="date" label="日期" width="180"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址"></i-table-column>
            </i-table>
        </demo-block>
        <demo-block title="header-cell-style">
            <i-table :data="tableData1" style="width:100%" :header-cell-style="{color:'red'}">
                <i-table-column prop="date" label="日期" width="180" align="center"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址" show-tooltip-when-overflow></i-table-column>
            </i-table> 
        </demo-block>
        <demo-block title="header-cell-class-name">
            <i-table :data="tableData1" style="width:100%" :header-cell-class-name="tableheaderClassName">
                <i-table-column prop="date" label="日期" width="180" align="center"></i-table-column>
                <i-table-column prop="name" label="姓名" width="180"></i-table-column>
                <i-table-column prop="address" label="地址" show-tooltip-when-overflow></i-table-column>
            </i-table> 
        </demo-block>
        <demo-block title="合计">
            <i-table :data="tableData3" max-height="300" style="width:100%" show-summary :summary-method="getSummaries">
                <i-table-column prop="date" label="日期" width="200" fixed="left"></i-table-column>
                <i-table-column prop="name" label="姓名" width="200" align="center"></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="age" label="年纪" show-tooltip-when-overflow></i-table-column>
                <i-table-column prop="name" label="姓名" width="200">
                    <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                    <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                    <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                    <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                    <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                </i-table-column>
                <i-table-column prop="name" label="姓名" width="200"></i-table-column>
                <i-table-column prop="address" label="地址"></i-table-column>
                <i-table-column fixed="right" align="center" label="操作" width="101" inline-template>
                    <div>
                    <i-button type="text">详情</i-button>
                    </div>
                </i-table-column>
            </i-table> 
        </demo-block>
    </div>
</template>

<script>
import data from "../data/tableData";

export default {
    data() {
        return {
            tableData1: data.data1,
            tableData3: data.data3
        };
    },
    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
                if (columnIndex === 0) {
                    return [1, 2];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "合计";
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += " 岁";
                } else {
                    sums[index] = "N/A";
                }
            });

            return sums;
        }
    }
};
</script>

<style>
.el-table .table-head-th {
    color: #0000ff;
}
</style>
