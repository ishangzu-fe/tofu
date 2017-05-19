<template>
    <i-dropdown 
        class="dropdown-tree"
        trigger="click" 
        menu-align="start"
        @click.native="handleClick">
        <i-input 
            class="title" 
            :class="{'title-active': isDropdownShow}"
            v-model="title" 
            :size="size"
            :placeholder="placeholder"
            :readonly="true" 
            :icon="iconClass">
        </i-input>
        <i-dropdown-menu ref="panel" class="panel" slot="dropdown">
            <slot></slot>
        </i-dropdown-menu>
    </i-dropdown>
</template>

<script>
export default {
    name: 'dropdown-tree',

    props: {
        size: String,
        title: String,
        placeholder: String
    },

    computed: {
        iconClass () {
            return this.isDropdownShow ? 'arrow-down reverse' : 'arrow-down'
        }
    },

    data () {
        return {
            isDropdownShow: false
        }
    },

    methods: {
        handleClick (e) {
            this.isDropdownShow = !this.isDropdownShow;
        }
    },

    mounted () {
        this.$refs.panel.$el.addEventListener('click', () => {
            this.handleClick();
            (document.body || document.documentElement).click();
        })
    }

}
</script>

<style lang="scss">
    .dropdown-tree {
        width: 200px;

        cursor: pointer;

        input {
            cursor: pointer;
        }

        .title {
            input {
                border-color: #c0ccda !important;
            }

            &:hover input {
                border-color: #20a0ff !important;
            }

            &.title-active input {
                border-color: #20a0ff !important;
            }
        }

        .el-icon-arrow-down {
            transition: transform .25s ease-in-out;

        }
        .reverse {
            transition: transform .25s ease-in-out;
            transform: rotate(-180deg);
        }
    }
    .el-dropdown-menu.panel {
        min-width: 200px;
        max-width: 400px;
        max-height: 500px;

        overflow: auto;

        &:before {
            content: '';
            
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;

            background: transparent;
        }

        .el-tree {
            border: none;
        }

        .el-tree-node-content {
            padding-right: 30px;
        }
    }
</style>