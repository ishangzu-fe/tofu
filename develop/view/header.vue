<template>
    <header class="header">
        <nav>
            <ul>
                <li
                    v-for="(option, index) in options"
                    :class="{active: index === activeIndex}"
                    @click.stop="active(option, index)">
                    {{option}}
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import Config from '../config';

export default {
    name: 'header',

    data () {
        return {
            activeIndex: 0,
            options: Config.components
        }
    },

    methods: {
        active (option, index) {
            this.activeIndex = index;

            this.$emit('active', option)
        }
    }
}
</script>

<style lang="scss">
.header {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    line-height: 40px;

    border-bottom: 1px solid #ddd;

    li {
        display: inline-block;
        box-sizing: border-box;
        height: 100%;
        padding: 0 20px;

        color: #ddd;

        &.active {
            color: #5DAC81;
        }
    }
}
</style>
