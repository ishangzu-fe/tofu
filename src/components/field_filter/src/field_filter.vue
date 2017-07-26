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
                    <li class="list-item" v-for="item in items" :key="item">
                        <i-checkbox :label="item"></i-checkbox>
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
        items: Array
    },

    data () {
        return {
            checked: []
        };
    },

    methods: {
        handleCheckChange (event) {
            this.$emit('change', event);
        }
    },

    created () {
        this.checked = this.items;
    }
};
</script>

<style lang="scss">
.field-filter {
    .list {
        padding: 6px 10px;

        .list-item {
            margin-bottom: 6px;

            .el-checkbox-inner {
                border-radius: 4px;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
