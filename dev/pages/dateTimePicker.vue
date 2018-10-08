<template>
    <div id="date-picker">
        <demo-block title="选择日">
            <i-row :gutter="10">
                <i-col :span="6">
                    <div class="is-left">默认</div>
                    <i-date-picker
                        v-model="value1"
                        type="datetimerange"
                        placeholder="请选择日期"
                        :picker-options="pikcerOptions1"
                        @change="handleChange"
                        :default-time="['12:00:00', '23:59:59']">
                    </i-date-picker>
                </i-col>
            </i-row>
        </demo-block>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value1: "",
            value2: "",
            pikcerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pickerOptions2: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ]
            }
        };
    },
    methods: {
        handleChange(val) {
            console.log(val, this.value1);
        }
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
#date-picker {
    .is-left {
        text-align: left;
        padding-left: 30px;
        font-size: 13px;
        color: #ddd;
        margin-bottom: 10px;
    }
    .el-date-editor {
        width: 100%;
    }
}
</style>