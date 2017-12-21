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
                    @change="handleChange">
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
        /**
         * {
         *   label,
         *   checked
         * }
         */
        value: Object
    },

    data () {
        return {
            checked: []
        };
    },

    watch: {
        value: {
            immediate: true,
            handler(newFields) {
                this.fields = newFields;
                for (let field of Object.values(this.fields)) {
                    if ('checked' in field && !field.checked) {
                        continue;
                    }
                    this.checked.push(field.label);
                }
            }
        }
    },

    methods: {
        handleChange (checkedLabels) {
            for (let key in this.fields) {
                const label = this.fields[key].label;
                if (~checkedLabels.indexOf(label)) {
                    this.fields[key].checked = true;
                } else {
                    this.fields[key].checked = false;
                }
            }

            this.$emit('input', this.fields);
        }
    }
};
</script>

<style lang="scss">
.field-filter {
    display: inline-block;

    .list {
        padding: 6px 10px;
        max-height: 300px;
        overflow: auto;

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
