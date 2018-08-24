<template>
    <div :class="`i-menu-item i-menu-item--${
            hasChildren ? 'branch' : 'leaf'
        }`">
        <div class="item__main"
            :class="{'item__main--active': this.state === 'activated' || this.state === 'expand'}"
            @click="activate">
            <div class="item__icon">
                <img :src="iconURL" v-if="iconURL">
                <i :class="iconClass" v-else-if="iconClass"></i>
            </div
            ><div class="item__label"
                :style="`text-indent: ${level > 2 ? 14 * (level - 2) : 0}px`">
                {{label}}
            </div>
            <div class="item__arrow" v-if="hasChildren">
                <img src="../../../assets/ra.png">
            </div>
        </div>
        <!-- 过渡动画使用简单的高度动画，参考 Element -->
        <transition @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter"
            @before-leave="handleBeforeLeave"
            @leave="handleLeave"
            @after-leave="handleAfterLeave">
            <div class="item__children" v-show="state === 'expand'">
                <i-menu-item v-for="(child, index) in children"
                    :key="`${id}-${level + 1}-${index}`"
                    :id="`${id}-${level + 1}-${index}`"
                    :parentID="id"
                    :level="level + 1"

                    :label="child.label"
                    :iconURL="child.iconURL"
                    :iconClass="child.iconClass"
                    :path="child.path"
                    :children="child.children"

                    @activated="handleChildrenActivated"
                    @deactivated="handleChildrenDeactivated">
                </i-menu-item>
            </div>
        </transition>
    </div>
</template>

<script>
import { addClass, removeClass } from '@/utils/dom.js';
export default {
    name: 'i-menu-item',

    props: {
        id: String | Number,
        parentID: String | Number,
        level: {
            type: Number,
            default: 1
        },
        label: String,
        iconURL: String,
        iconClass: String,
        path: String,
        children: Array
    },

    data() {
        return {
            state: '',
            currentActivatedID: '', // 用于检测是否是激活的子菜单取消激活
        }
    },

    computed: {
        hasChildren() {
            return !!(this.children && this.children.length);
        }
    },

    methods: {
        /**
         * 激活有两种情况：
         * 1.主动激活，即用户点击的结果
         * 2.被动激活，即外部路由切换，激活相应的菜单，并且此时可选择收起非激活的菜单
         */
        activate() {
            if (this.state === 'activated') return;
            if (this.path && !this.hasChildren) {
                // 如果未检测到 this.$router 则报错
                if (!this.$router) console.error('清先注册 Vue-router');

                this.$router.push(this.path);
                this.state = 'activated';
                // 上抛事件
                this.$emit('activated', {
                    id: this.id,
                    path: this.path,
                    label: this.label
                }, false);
            } else {
                this.foldOrExpand();
            }
        },

        /**
         * 单纯地展开和折叠
         */
        foldOrExpand() {
            if (this.hasChildren) {
                this.state = this.state === 'fold' ?
                    'expand' :
                    'fold';
            }
        },

        /**
         * 当子菜单激活或者取消激活时进行的行为
         */
        handleChildrenActivated(menuInfo, passive) {
            this.currentActivatedID = menuInfo.id;
            this.state = 'expand';
            if ((!this.parentID && !passive) || this.parentID)this.$emit('activated', menuInfo);
        },
        handleChildrenDeactivated(menuInfo) {
            // 检测是否是激活的子菜单取消激活
            if (menuInfo.id !== this.currentActivatedID) return;

            this.state = 'fold';
            if (this.parentID) this.$emit('deactivated', menuInfo);
        },

        /* 简单的高度动画，参考 Element */

        handleBeforeEnter(el) {
            addClass(el, 'collapse-transition');
            if (!el.dataset) el.dataset = {};

            el.dataset.oldPaddingTop = el.style.paddingTop;
            el.dataset.oldPaddingBottom = el.style.paddingBottom;

            el.style.height = '0';
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        },

        handleEnter(el) {
            el.dataset.oldOverflow = el.style.overflow;
            if (el.scrollHeight !== 0) {
                el.style.height = el.scrollHeight + 'px';
                el.style.paddingTop = el.dataset.oldPaddingTop;
                el.style.paddingBottom = el.dataset.oldPaddingBottom;
            } else {
                el.style.height = '';
                el.style.paddingTop = el.dataset.oldPaddingTop;
                el.style.paddingBottom = el.dataset.oldPaddingBottom;
            }

            el.style.overflow = 'hidden';
        },

        handleAfterEnter(el) {
            // for safari: remove class then reset height is necessary
            // removeClass(el, 'collapse-transition');
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
        },

        handleBeforeLeave(el) {
            if (!el.dataset) el.dataset = {};
            el.dataset.oldPaddingTop = el.style.paddingTop;
            el.dataset.oldPaddingBottom = el.style.paddingBottom;
            el.dataset.oldOverflow = el.style.overflow;

            el.style.height = el.scrollHeight + 'px';
            el.style.overflow = 'hidden';
        },

        handleLeave(el) {
            if (el.scrollHeight !== 0) {
                // for safari: add class after set height, or it will jump to zero height suddenly, weired
                // addClass(el, 'collapse-transition');
                el.style.height = 0;
                el.style.paddingTop = 0;
                el.style.paddingBottom = 0;
            }
        },

        handleAfterLeave(el) {
            removeClass(el, 'collapse-transition');
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
    },

    created() {
        // Init state
        this.state = this.hasChildren ? 'fold' : 'deactivated';

        /**
         * 监听路由有两种情况：
         * 1.外部监听，只要把激活的路径传进来，甚至只把激活的菜单 ID 传进来
         *   优点：可以跟路由解耦，但是根据自身的业务场景，减少开发需要处理的代码，显得更合适
         * 2.内部监听，内部监听也分为两种：
         *      1.容器监听：只有一个监听器，但需要通知激活的菜单，但考虑到单一职责原则，似乎这种方式并不可取
         *      2.组件监听：N 个监听器，但不需通知激活的菜单
         */
        // 被动激活以及取消激活
        if (!this.hasChildren && this.path) {
            this.$watch('$route', (newRoute) => {
                const { path } = newRoute;
                if (this.state !== 'activated' && this.path === path) {
                    this.state = 'activated';
                    this.$emit('activated', {
                        id: this.id,
                        path: this.path,
                        label: this.label
                    }, true);
                } else if (this.state === 'activated' && this.path !== path) {
                    this.state = 'deactivated';
                    this.$emit('deactivated', {
                        id: this.id,
                        path: this.path,
                        label: this.label
                    }, true);
                }
            });
        }
    }
}
</script>

<style lang="scss">
.collapse-transition {
    transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}

.i-menu-item {
    // 各种边界问题，比如 label 长度
    width: 100%;
    .item__main {
        position: relative;
        margin-bottom: 4px;
        box-sizing: border-box;
        padding: 0 12px 0 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
        &.item__main--active {
            background: #2B2D34;
            .item__arrow img {
                transform: rotate(90deg);
            }
        }
        &:hover {
            background: #2A9BFD;
        }
        .item__icon {
            display: inline-block;
            width: 14px;
            height: 100%;
            vertical-align: top;
            * {
                width: 14px;
                vertical-align: middle;
            }
        }
        .item__label {
            display: inline-block;
            box-sizing: border-box;
            padding-left: 18px;
            height: 100%;
            max-width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            text-align: left;
            font-size: 14px;
        }
        .item__arrow {
            float: right;
            display: inline-block;
            height: 100%;
            img {
                vertical-align: middle;
                transition: transform .3s ease-in-out;
            }
        }
    }
    .item__children {
        width: 100%;
        .item__label {
            font-size: 12px;
        }
    }
}
</style>