<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="item in columns" :key="item">
                    {{item.name}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in filteredData" :key="entry">
                <td v-for="item in columns" :key="item.key" v-html="entry[item.key]"></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'grid',
        props: {
            data: {
                type: Array,
                default: []
            },
            columns: {
                type: Array,
                default: []
            },
            filterKey: String
        },
        data() {
            var sortOrders = {}
            this.columns.forEach(function(key) {
                sortOrders[key] = 1
            })
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredData: function() {
                var filterKey = this.filterKey && this.filterKey.toLowerCase()
                var data = this.data
                if (filterKey) {
                    data = data.filter(function(row) {
                        return Object.keys(row).some(function(key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
    
                return data
            }
        }
    }
</script>

<style scoped>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }
    
    .table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        color: #5e6d82;
        font-size: 14px;
        margin-bottom: 45px;
    }
    
    .table th:first-child,
    .table td:first-child {
        padding-left: 10px;
    }
    
    .table th {
        text-align: left;
        border-top: 1px solid #eaeefb;
        background-color: #eff2f7;
    }
    
    .table th,
    .table td {
        border-bottom: 1px solid #eaeefb;
        padding: 10px 0;
    }
</style>