<template>
    <transition name="dialog-fade">
        <div class="el-dialog-wrapper" v-show="value" @click.self="handleWrapperClick">
            <div class="el-dialog"
                 :class="[sizeClass, customClass]"
                 ref="dialog"
                 :style="style">
                <div class="el-dialog-header">
                    <span class="el-dialog-title">{{title}}</span>
                    <div class="el-dialog-headerbtn">
                        <i v-if="showClose" class="el-dialog-close el-icon el-icon-close" @click='close()'></i>
                    </div>
                </div>
                <div class="el-dialog-body" v-if="rendered">
                    <slot></slot>
                </div>
                <div class="el-dialog-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Popup from '../../../utils/vue-popup';

    export default {
        name: 'el-dialog',

        mixins: [Popup],

        props: {
            title: {
                type: String,
                default: ''
            },

            modal: {
                type: Boolean,
                default: true
            },

            appendToBody:{
                type: Boolean,
                default:false
            },

            lockScroll: {
                type: Boolean,
                default: true
            },

            closeOnClickModal: {
                type: Boolean,
                default: true
            },

            closeOnPressEscape: {
                type: Boolean,
                default: true
            },

            showClose:{
                type: Boolean,
                default:true
            },

            size: {
                type: String,
                default: 'normal'
            },

            customClass: {
                type: String,
                default: ''
            },

            top: {
                type: String,
                default: '15%'
            }
        },
        data(){
            return {
                visible:false
            }
        },
        watch: {
            value(val){
                this.visible = val;
            },
            visible(val) {
                this.$emit('input',val);
                if (val) {
                    this.$emit('open');
                    this.$nextTick(() => {
                        this.$refs.dialog.scrollTop = 0;
                    });
                    if(this.appendToBody){
                        document.body.appendChild(this.$el);
                    }
                } else {
                    this.$emit('close');
                }
            }
        },

        computed: {
            sizeClass() {
                return `el-dialog-${ this.size }`;
            },
            style() {
                return this.size === 'full' ? {} : { 'margin-bottom': '50px', 'top': this.top };
            }
        },

        methods: {
            handleWrapperClick() {
                if (this.closeOnClickModal) {
                    this.close();
                }
            }
        },

        mounted() {
            if (this.value) {
                this.rendered = true;
                this.open();
                if(this.appendChild){
                    document.body.appendChild(this.$el);
                }
            }
        }
    };
</script>
