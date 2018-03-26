<template>
    <div class="i-menu-group">
        <i-menu-item v-for="menuItem in menuItems"
            :key="menuItem.id"

            :id="menuItem.id"
            :parentID="menuItem.parentID"
            :level="menuItem.level"
            :label="menuItem.label"
            :icon="menuItem.icon"
            :route="menuItem.route"
            :children="menuItem.children"

            @expand-children="eventHandler"
            @enter-route="eventHandler">
        </i-menu-item>
    </div>
</template>

<script>
import IMenuItem from './menu-item';

export default {
    name: 'i-menu-group',

    components: {
        IMenuItem
    },

    props: {
        id: String | Number,
        parentID: String | Number,
        level: String | Number,
        menuItems: Array,
        state: String
    },

    watch: {
        state(newState) {

        }
    },

    methods: {
        eventHandler(event) {
            console.log('触发了事件：', event);
        }
    }
}
</script>

<style lang="scss">
.i-menu-group {

}
</style>
