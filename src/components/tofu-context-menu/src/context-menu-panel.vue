<template>
    <div class="context-menu-panel"
        :class="{'is-children': isChildren,
                'is-left': this.horDirection === 'left',
                'is-bottom': this.verDirection === 'bottom'}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'context-menu-panel',

    props: {
        isChildren: Boolean,
        horDirection: String,
        verDirection: String
    }
}
</script>

<style lang="scss">
.context-menu-panel {
    padding: 8px 0;
    width: 120px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 15px 0 rgba(0,0,0,0.30);
    list-style: none;

    &.is-children {
        position: absolute;
        left: 100%;
        top: -8px;
        width: 100px;

        &.is-left {
            left: initial;
            right: 100%;
        }

        &.is-bottom {
            top: initial;
            bottom: -8px;
        }
    }
}
</style>
