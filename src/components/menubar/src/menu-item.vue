<template>
    <div class="menu-item">
        <div
            class="menu-item-main"
            :class="{'menu-item-active': activeMenu === menu}"
            :style="{'padding-left': paddingLeft}"
            @click.stop="activate">
            <i class="menu-item-icon" :class="menu.iconClass" v-if="menu.iconClass"></i>
            <span class="menu-item-icon" v-if="menu._deep === 0"><slot></slot></span>
            <span class="menu-item-label">{{ menu.label }}</span>
            <span class="menu-item-arrow" :class="{'menu-item-arrow-active': childrenVisibility}" v-if="menu.children"></span>
            <span class="menu-item-sign" v-else></span>
        </div>
        <menu-item
            @menuItem_activate="emitSubActivate"
            class="menu-item-child"
            v-for="menu in menu.children"
            :menu="menu"
            :activeMenu="activeMenu"
            :useRouter="useRouter"
            v-show="childrenVisibility">
        </menu-item>
    </div>
</template>

<style lang="scss">
.menu-item {
    position: relative;

    box-sizing: border-box;
    width: 100%;

    .menu-item-main {
        position: relative;

        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 0 20px;
        line-height: 50px;

        font-family: PingFang-SC-Semibold;
        font-size: 14px;
        font-weight: bold;

        cursor: pointer;

        transition: all .4s ease-in-out;

        .menu-item-label {
            vertical-align: top;
        }

        .menu-item-icon {
            display: inline-block;

            box-sizing: border-box;
            width: 26px;
            height: 50px;
            line-height: 50px;

            text-align: center;
        }

        .menu-item-arrow {
            position: absolute;
            right: 16px;
            top: 17px;

            width: 16px;
            height: 16px;

            background: url('/static/triangle_down.svg') no-repeat;
            background-position: center;
            background-size: 8px 8px;

            transform: rotate(-90deg);
            transition: transform .2s ease-in-out;

            &.menu-item-arrow-active {
                transform: rotate(0deg)
            }
        }

        .menu-item-sign {
            position: absolute;
            left: 0;
            top: 0;

            width: 3px;
            height: 0px;

            opacity: 0;

            transition: all .4s ease-in-out;
        }
    }

    .menu-item-child .menu-item-main {
        font-family: PingFang-SC-Regular;
        font-size: 12px;
        font-weight: normal;

        background: #F5F5F5;

        &:hover, &.menu-item-active {
            color: #20A0FF;

            background-color: #E5F4FF;

            .menu-item-sign {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);

                width: 3px;
                height: 50px;

                opacity: 1;
                background: #20A0FF;
            }
        }
    }
}
</style>

<script>
    export default {
        name:'menu-item',
        props:{
            useRouter: {
                default: false
            },
            menu: {
                required:true,
                validator () {
                    return true
                    // TODO 校验
                    // {
                    //   label,
                    //   name,
                    //   id,
                    //   idx,
                    //   children,
                    //   activate
                    // }
                }
            },
            activeMenu: {
                required: true
            }
        },

        data () {
            return {
                childrenVisibility: false,
                visible: this.menu._visible
            }
        },

        computed: {
            paddingLeft () {
                return this.menu._deep * 32 + 20 + 'px' // TODO 有两个未知问题？
            }
        },

        methods: {
            activate () {
                if (this.menu.children) {
                    this.childrenVisibility = !this.childrenVisibility;
                } else {
                    // 如果使用 vue-router，则 push 路径
                    // 否则就执行指定的函数
                    if (this.useRouter) {
                        this.$router.push(this.menu.path)
                    }
                    // else {}

                    // 触发事件
                    this.$emit('menuItem_activate', this.menu)
                }
            },

            emitSubActivate (menu) {
                this.$emit('menuItem_activate', menu)
            },

            checkVisibility (v) {
                let parents = []
                const extractParents = (v) => {
                    if (v._parent) {
                        parents.push(v._parent._id)
                        if (v._parent._parent) {
                            extractParents(v._parent)
                        }
                    }
                }

                extractParents(v);

                return parents.indexOf(this.menu._id) !== -1
            }
        },

        created () {
            // 如果是父菜单，自动切换子菜单的可见性
            if (this.useRouter && this.menu.children) {
                this.$watch('activeMenu', (newV) => {
                    if (newV) {
                        this.childrenVisibility = this.checkVisibility(newV)
                    } else {
                        this.childrenVisibility = false
                    }
                })

                // 初始化时
                if (this.activeMenu && this.checkVisibility(this.activeMenu)) {
                    this.childrenVisibility = true
                }
            }
        }
    }
</script>
