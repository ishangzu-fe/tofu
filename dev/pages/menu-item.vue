<template>
    <div :class="`i-menu-item i-menu-item--${state}`" @click="handleClick">
        <span>
            <img class="item-icon" :src="icon">
        </span>
        <span class="item-label">{{label}}</span>
        <span>
            <img class="item-arrow" :src="">
        </span>
    </div>
</template>

<script>
export default {
    name: 'i-menu-item',

    props: {
        id: String | Number,
        parentID: String | Number,
        level: Number,
        label: String,
        icon: String,
        route: String,
        children: Array
    },

    data() {
        return {
            state: 'inactive'
        }
    },

    methods: {
        /**
         * 点击激活路由路径
         */
        enterRoute() {
            if (this.$router) {
                this.$router.push(this.route);
            } else {
                console.error('没有找到 vue-router');
            }
        },
        expandChildren() {
            this.state = 'active';
            this.$emit('expand-children', this.id);
        },
        foldChildren() {
            this.state = 'inactive';
            this.$emit('fold-children', this.id);
        },

        /**
         * 处理点击事件
         */
        handleClick() {
            if (this.children && this.children.length) {
                this.expand();
            } else {
                this.enterRoute();
            }
        }
    }
}
</script>

<style lang="scss">
.i-menu-item {
    box-sizing: border-box;
    padding-left: 20px;
    width: 100%;
    height: 40px;
    color: #fff;

    &.i-menu-item--active {
        background: #2B2D34;

        .item-arrow {
            transform: rotate(90deg);
        }
    }

    &:hover {
        background: #2A9BFD;
    }

    span {
        vertical-align: middle;
    }

    .item-icon {
        width: 14px;
        height: 14px;
    }

    .item-label {
        display: inline-block;
        box-sizing: border-box;
        padding-left: 18px;
        width: 140px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
    }

    .item-arrow {
        width: 10px;
        height: 10px;
    }
}
</style>
