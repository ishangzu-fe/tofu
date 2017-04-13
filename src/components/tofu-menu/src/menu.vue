<template>
    <div class="vvc-menu-bar">
        <menu-item
            @menuItem_activate="emitActivate"
            :useRouter="config.useRouter"
            :activeMenu="activeMenu"
            v-for="menu in menus"
            :menu="menu">
            <!-- TODO vue v-for 循环中添加 slot 会报错 -->
            <!-- <slot></slot> -->
            <span class="menu-icon"></span>
        </menu-item>
    </div>
</template>

<style lang="scss">
.vvc-menu-bar {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    
    -webkit-user-select: none;
    user-select: none;
}
</style>

<script>
    import MenuItem from './menu-item';

    export default{
        name:'menu',

        props:{
            config: {
                required: true,
                validator () {
                    return true
                    // {
                    //   direction, // TODO
                    //   useRouter,
                    //   color, // TODO
                    //   menus,
                    //      {
                    //          id, // TODO
                    //          label,
                    //          color,
                    //          iconClass,
                    //          children,
                    //          path,
                    //          activate(optional),
                    //      }
                    //   defaultActiveId, // TODO
                    // }
                }
            }
        },

        data () {
            return {
                activeMenu: undefined
            }
        },

        computed: {
            menus () {
                let id = 0
                let rt = this.traverse(this.config.menus, (v, deep, parent) => {
                    v._deep = deep
                    v._id = id++
                    if (parent) {
                        v._parent = parent
                    }
                }, 0)

                // 查看当前路由是否匹配菜单
                this.traverse(rt, (v) => {
                    if (v.path === this.$route.path) {
                        this.activeMenu = v
                    }
                })

                return rt
            }
        },

        methods: {
            /**
             * 递归遍历菜单，对菜单做指定的操作
             *
             * @param {Array}    menus
             * @param {Function} doSomeThing
             * @param {Number}   deep        数组层级
             * @param {Object}   parent      父菜单
             */
            traverse (menus, doSomeThing, deep, parent) {
                var deep = deep || 0

                menus.forEach((v) => {
                    doSomeThing(v, deep, parent)

                    if (v.children && v.children instanceof Array) {
                        let d = deep + 1
                        this.traverse(v.children, doSomeThing, d, v)
                    }
                    // else {}
                })

                return menus
            },

            emitActivate (menu) {
                this.activeMenu = menu

                this.$emit('activate', menu)
            }
        },

        components: {
            'menu-item': MenuItem
        },

        created () {
            // 如果使用 vue-router，则对 router 进行监控
            // 有变化，则与菜单项的路径进行匹配
            // 若相等，则激活相应菜单
            if (this.config.useRouter) {
                this.$watch('$route', (val) => {
                    this.activeMenu = null
                    this.traverse(this.menus, (v) => {
                        if (v.path === val.path) {
                            this.activeMenu = v
                        }
                    })
                })
            }
        }
    }
</script>
