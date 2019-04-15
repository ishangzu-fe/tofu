<template>
    <div class="i-menu" :class="{'is-collapse': collapse}">
        <!-- 可以采用 slot 的方式，即木偶组件而非智能组件 -->
        <!-- 但根据自身的业务场景，对修改封闭，减少开发的代码更重要 -->
        <i-menu-item v-for="(menu, index) in menus"
            :key="`root-1-${index}`"
            :id="`root-1-${index}`"
            parentID="root"
            :level="1"

            :label="menu.label"
            :iconURL="menu.iconURL"
            :iconClass="menu.iconClass"
            :path="menu.path"
            :children="menu.children"

            @activated="handleChildrenActivated">
        </i-menu-item>
    </div>
</template>

<script>
import IMenuItem from './menu-item';

export default {
    name: 'i-menu',

    components: {
        IMenuItem
    },

    props: {
        menus: Array,
        collapse:Boolean
    },

    methods: {
        handleChildrenActivated(menuInfo) {
            this.$emit('activated', menuInfo);
        }
    }
}
</script>

<style lang="scss">
.i-menu {
    width: 100%;
    height: 100%;
    background: #2F323E;

    &.is-collapse{
        .i-menu-item{
            position: relative;

            .item__main{
                padding: 0 12px;
                text-align: center;
            }

            .item__label,
            .item__arrow{
                display: none;
            }
        }
    }
}
</style>
