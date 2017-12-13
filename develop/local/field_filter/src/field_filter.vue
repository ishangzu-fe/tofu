<template>
    <div class="field-filter">
        <i-popup
            title="隐藏显示列"
            direction="north"
            :autoClose="false"
            icon-class="tofu-icon icon-stop-square">
            <ul class="list">
                <i-checkbox-group
                    v-model="checked"
                    @change="handleCheckChange">
                    <li class="list-item" v-for="field in fields" :key="field.label">
                        <i-checkbox :label="field.label + ''"></i-checkbox>
                    </li>
                </i-checkbox-group>
            </ul>
        </i-popup>
    </div>
</template>

<script>
import IPopup from '../../popup';

export default {
    name: 'field-filter',

    components: {
        IPopup
    },

    props: {
        value: Object
    },

    data () {
        return {
            checked: []
        };
    },

    methods: {
        handleCheckChange (checkedLabels) {
            for (let key in this.fields) {
                this.fields[key].checked = false;

                checkedLabels.forEach(label => {
                    if (label === this.fields[key].label) {
                        this.fields[key].checked = true;
                    }
                });
            }

            this.$emit('input', this.fields);
        }
    },

    created () {
        this.fields = this.value;

        for (let key in this.fields) {
            this.checked.push(this.fields[key].label);
        }
    }
};
</script>

<style lang="scss">
.field-filter {
    display: inline-block;

    .list {
        padding: 6px 10px;

        .list-item {
            margin-bottom: 6px;

            text-align: left;

            .el-checkbox {
                width: 100%;

                .el-checkbox-inner {
                    border-radius: 4px;
                }
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
