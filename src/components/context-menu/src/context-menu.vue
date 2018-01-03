<template>
    <div class="context-menu"
        v-show="showPanel"
        :style="{ left: this.x + 'px', top: this.y + 'px' }">
        <context-menu-panel>
            <context-menu-item
                v-for="(menuItem, index) in menuItems"
                :index="index"
                :panelY="y"
                :label="menuItem.label"
                :handler="menuItem.handler"
                :key="menuItem.label"
                :iconURL="menuItem.iconURL"
                :children="menuItem.children"
                :horDirection="childHorDirection">
            </context-menu-item>
        </context-menu-panel>
    </div>
</template>

<script>
import ContextMenuPanel from './context-menu-panel';
import ContextMenuItem from './context-menu-item';

export default {
    name: 'context-menu',

    components: {
        ContextMenuPanel,
        ContextMenuItem
    },

    data() {
        return {
            menuItems: [],
            x: 0,
            y: 0,
            showPanel: false,
            childHorDirection: 'right'
        }
    },

    methods: {
        show(menuItems, e) {
            if (!menuItems || !menuItems.length) return;
            e.stopPropagation();
            e.preventDefault();

            this.menuItems = this.normalizeItems(menuItems);
            this.setPosition(e);
            this.showPanel = true;
        },

        setPosition(e) {
            const { x, y } = this.getPosition(e);
            this.x = x;
            this.y = y;
        },

        getPosition(e) {
            // 菜单宽高
            const childWidth = 100;
            const menuPadding = 16;
            const menuWidth = 120;
            const menuHeight = this.menuItems.length * 22 + menuPadding;
            this.menuHeight = menuHeight;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            let x = mouseX;
            let y = mouseY;
            const viewWidth = window.innerWidth;
            const viewHeight = window.innerHeight;

            if (viewHeight - mouseY < menuHeight) {
                y = mouseY - menuHeight;
            }
            if (viewWidth - mouseX < menuWidth) {
                x = mouseX - menuWidth;
                this.childHorDirection = 'left';
            } else if (viewWidth - mouseX - menuWidth < childWidth) {
                this.childHorDirection = 'left';
            } else {
                this.childHorDirection = 'right';
            }

            return { x, y };
        },

        normalizeItems(menuItems) {
            return menuItems
        }
    },

    mounted() {
        window.onclick = () => {
            this.showPanel = false;
        }
    }
}
</script>

<style lang="scss">
.context-menu {
    position: fixed;
    z-index: 10000;
}
</style>
