<template>
    <div class="i-menu">
        <i-menu-group v-for="menuGroup in menuGroups"
            :key="menuGroup.id"

            :id="menuGroup.id"
            :parentID="menuGroup.parentID"
            :level="menuGroup.level"
            :menuItems="menuGroup"
            :state="menuGroup.state"

            @expand="eventHandler">
        </i-menu-group>
    </div>
</template>

<script>
import IMenuGroup from './menu-group';

export default {
    name: 'i-menu',

    components: {
        IMenuGroup
    },

    props: {
        menus: Array
    },

    data() {
        menuGroups: []
    },

    watch: {
        menus: {
            immediate: true,
            handler(newMenus) {
                this.menuGroups = this.normalizeMenus(newMenus);
            }
        }
    },

    methods: {
        /**
         * 标准化菜单
         * 将菜单对象数组转换成菜单组合数组
         * menu: [
         *   { label, icon, route, children }
         * ]
         * ->
         * menuGroups: [
         *   { id, parentID, level, menuItems }
         *   ->
         *   { id, parentID, label, icon, route, children, level }
         * ]
         */
        normalizeMenus(menus, menuLevel = 1) {
            let menuGroups = [];
            let groupID = 0; // 从 0 开始可以跟数组索引所对应
            let menuItemID = 0;

            createMenuGroup(menus);

            return menuGroups;

            function createMenuItem(menu, ...args) {
                return Object.assign({}, menu, args);
            }

            function createMenuGroup(menus, groupLevel = 1, groupParentID, menuParentID) {
                if (!menus || !menus.length) return;

                let menuItems = []
                let menuGroup = {
                    id: groupID++,
                    parentID: groupParentID,
                    level: groupLevel,
                    state: groupLevel === 1 ? 'expand' : 'fold'
                }

                menus.forEach((menu, index) => {
                    menuItems.push(
                        createMenuItem(
                            menu,
                            groupLevel,
                            menuItemID++,
                            menuParentID
                        )
                    );

                    if (menu.children && menu.children.length) {
                        createMenuGroup( // 生成子菜单组合
                            menus,
                            groupLevel + 1,
                            menuGroup.id,
                            menu.id
                        );
                        createMenuGroup( // 生成兄弟菜单组合
                            menus.slice(index + 1),
                            groupLevel,
                            groupParentID
                        );
                        break; // 若菜单有子菜单，则算作一个分割点
                    }
                });

                menuGroup.menuItems = menuItems;
                menuGroups.push(menuGroup);
            }
        },

        /**
         * 获取发生改变的菜单组合
         */
        getNeedChangeGroups(parentID) {
            let needChangeGroups = [];

            this.menuGroups.forEach(menuGroup => {
                if (menuGroup.parentID === parentID) {
                    needChangeGroups.push(menuGroup);
                }
            });

            return needChangeGroups;
        },

        /**
         * 显示菜单组合
         * @param {Number} parentID 父菜单组合ID
         */
        expand(parentID) {
            let groups = this.getNeedChangeGroups(parentID);
            for (let i = 0; i < groups.length; i++) {
                groups[i].state = 'expand';
            }
        },

        /**
         * 显示菜单组合，并隐藏其他组合
         */
        expandAndFoldOthers(parentID) {
            let performGroups = [];
            this.menuGroups.forEach(menuGroup => {
                if (menuGroup.parentID === parentID) {
                    performGroups.push(menuGroup);
                } else if (menuGroup.parentID) {
                    this.fold(menuGroup.parentID);
                }
            });
        },

        /**
         * 隐藏菜单组合
         * @param {Number} parentID 父菜单组合ID
         */
        fold(parentID) {
            let groups = this.getNeedChangeGroups(parentID);
            for (let i = groups.length - 1; i > 0; i--) {
                groups[i].state = 'fold';
            }
        },

        /**
         * 折叠所有子菜单组合
         */
        foldAllChildren(parentID) {
            // 不一定会触发 vue $update
            let prevID;
            this.menuGroups.forEach(menuGroup => {
                if (menuGroup.parentID === parentID) {
                    prevID = menuGroup.id;
                    menuGroup.state = 'fold';
                } else if (menuGroup.parentID === prevID) {
                    prevID = menuGroup.id;
                    menuGroup.state = 'fold';
                }
            });
        },

        eventHandler(event) {
            console.log('触发了事件：', event);
        }
    }
}
</script>

<style lang="scss">
.i-menu {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
