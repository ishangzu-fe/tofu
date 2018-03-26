<template>
    <div 
        class="tofu-dropdown" 
        @mouseover="onMouseover"
        @mouseleave="onMouseleave">
        <v-button 
            :label="label" 
            :state="showPanel"
            @click.native="togglePanel()">
            <div class="dropdown-button-icon" slot="tail">
                <v-icon iconClass="tofu-icon icon-arrow-down" :size="9"/>
            </div>
        </v-button>
        <v-panel :class="`${pos} pos`" :toggle="showPanel" :lazy="true" @click.native="hidePanel">
            <slot></slot>
        </v-panel>
    </div>
</template>

<script>
    import VButton from '../../tofu-button'
    import VIcon from '../../tofu-icon'
    import VPanel from '../../tofu-panel'

    export default {
        name: 'tofu-dropdown',

        components: {
            VButton,
            VIcon,
            VPanel
        },

        props: {
            label: String,
            hover: Boolean,
            pos: {
                type: String,
                default: 'bottom-right'
            }
        },

        data () {
            return {
                iconClass: '',
                showPanel: false
            }
        },

        methods: {
            togglePanel (v) {
                this.showPanel = this.showPanel ? false : true
            },

            onMouseover () {
                if (this.hover) {
                    this.showPanel = true
                }
            },

            onMouseleave () {
                if (this.hover) {
                    this.showPanel = false
                }
            },

            hidePanel () {
                this.showPanel = false
            }
        }
    }
</script>

<style lang="scss">
    .tofu-dropdown {
        position: relative;

        .pos {
            position: absolute;

            &.top-left {
                top: 25%;
                right: 50%;
                transform: translateY(-100%);

                &.tofu-panel-component {
                    box-shadow: 0px -6px 15px 0 rgba(0, 0, 0, 0.3);
                }
            }
            &.top-right {
                top: 25%;
                left: 50%;
                transform: translateY(-100%);

                &.tofu-panel-component {
                    box-shadow: 0px -6px 15px 0 rgba(0, 0, 0, 0.3);
                }
            }
            &.bottom-left {
                top: 75%;
                right: 50%;

                &.tofu-panel-component {
                    box-shadow: 0px 6px 15px 0 rgba(0, 0, 0, 0.3);
                }
            }
            &.bottom-right {
                top: 75%;
                left: 50%;

                &.tofu-panel-component {
                    box-shadow: 0px 6px 15px 0 rgba(0, 0, 0, 0.3);
                }
            }
        }

        .dropdown-button-icon {
            display: inline-block;
        }
    }
</style>