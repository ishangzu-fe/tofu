<template>
    <div id="transfer">
        <demo-block title="基础用法">
            <i-transfer v-model="value1" :data="data"></i-transfer>
        </demo-block>
        <demo-block title="可搜索">
            <i-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入城市拼音"
                v-model="value2"
                :data="data2">
            </i-transfer>
        </demo-block>
        <demo-block title="可自定义">
            <i-transfer
                v-model="value3"
                filterable
                :left-default-checked="[2, 3]"
                :right-default-checked="[1]"
                :render-content="renderFunc"
                :titles="['Source', 'Target']"
                :button-texts="['到左边', '到右边']"
                :footer-format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
                }"
                @change="handleChange"
                :data="data3">
                <i-button class="transfer-footer" slot="left-footer" size="small">操作</i-button>
                <i-button class="transfer-footer" slot="right-footer" size="small">操作</i-button>
            </i-transfer>
        </demo-block>
        <demo-block title="数据项属性别名">
            <i-transfer
                v-model="value4"
                :props="{
                key: 'value',
                label: 'desc'
                }"
                :data="data4">
            </i-transfer>
        </demo-block>
    </div>
</template>

<script>
export default {
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        const generateData2 = _ => {
            const data = [];
            const cities = [
                "上海",
                "北京",
                "广州",
                "深圳",
                "南京",
                "西安",
                "成都"
            ];
            const pinyin = [
                "shanghai",
                "beijing",
                "guangzhou",
                "shenzhen",
                "nanjing",
                "xian",
                "chengdu"
            ];
            cities.forEach((city, index) => {
                data.push({
                    label: city,
                    key: index,
                    pinyin: pinyin[index]
                });
            });
            return data;
        };
        const generateData3 = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        const generateData4 = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    value: i,
                    desc: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            data: generateData(),
            value1: [1, 4],

            data2: generateData2(),
            value2: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            },
            data3: generateData3(),
            value3: [1],
            renderFunc(h, option) {
                return (
                    <span>
                        {option.key} - {option.label}
                    </span>
                );
            },
            data4: generateData4(),
            value4: []
        };
    },
    methods: {
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        }
    }
};
</script>

<style lang="scss" scoped>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
</style>
