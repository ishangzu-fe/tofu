<template>
<div class="tab-store-item" @click="activate">
    <span
        class="store-item-select tofu-icon icon-check"
        :class="{'space': tab.id !== activeId}">
    </span>
    <span class="store-item-label">{{tab.label}}</span>
    <span
        class="store-item-close tofu-icon icon-close"
        @click="destroy"
        v-if="!tab.fixed">
    </span>
</div>
</template>

<script>
export default {
    name: "tabStoreItem",

    props: {
        // id: String | Number,
        // idx: Number,
        // label: String,
        // path: String,
        // moveOffset: Number, // 移动偏移量
        // fixed: Boolean // 是否固定，用来判断能否删除和移动
        tab: Object, // include above props
        activeId: String
    },

    methods: {
        activate() {
            this.$emit("store-activate", this.tab.id);
        },

        destroy() {
            this.$emit("store-destroy", this.tab.id);
        }
    }
};
</script>

<style lang="scss">
$item-height: 22px;
$item-color: #1e2c3c;

$item-check-width: 18px;
$item-close-width: 30px;
$item-label-width: calc(100% - #{$item-close-width} - #{$item-check-width});

.tab-store-item {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: $item-height;
    line-height: $item-height;

    position: relative;

    color: $item-color;
    font-size: 12px;
    letter-spacing: 0.3px;

    background: transparent;

    cursor: pointer;

    &:hover {
        color: #fff;
        background: #20a0ff;
    }

    .store-item-select {
        display: inline-block;
        box-sizing: border-box;
        width: $item-check-width;
        height: 100%;

        // 微调
        position: relative;
        top: 1px;

        font-size: 12px;
        text-align: center;
        overflow: hidden;

        &.space {
            color: transparent;
        }
    }

    .store-item-label {
        display: inline-block;
        box-sizing: border-box;
        width: $item-label-width;
        height: 100%;
        background: transparent;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .store-item-close {
        display: inline-block;
        box-sizing: border-box;
        width: $item-close-width;
        height: 100%;

        position: absolute;
        right: 0;
        top: 0;

        color: #fff;
        text-align: center;

        background: transparent;
    }
}
</style>