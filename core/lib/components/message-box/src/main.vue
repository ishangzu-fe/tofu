<template>
    <div class="el-message-box-wrapper">
        <transition name="msgbox-fade">
            <div class="el-message-box" v-show="value">
                <div class="el-message-box-header" v-if="title !== ''">
                    <div class="el-message-box-title">{{ title }}</div>
                    <i class="el-message-box-close el-icon-close" @click="handleAction('cancel')" v-if="showClose"></i>
                </div>
                <div class="el-message-box-content" v-if="message !== ''">
                    <div class="el-message-box-status" :class="[ typeClass ]"></div>
                    <div class="el-message-box-message" :style="{ 'margin-left': typeClass ? '50px' : '0' }"><p v-html="message"></p></div>
                    <div class="el-message-box-input" v-show="showInput">
                        <i-input v-model="inputValue" :placeholder="inputPlaceholder" ref="input"></i-input>
                        <div class="el-message-box-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
                    </div>
                </div>
                <div class="el-message-box-btns">
                    <i-button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click.native="handleAction('cancel')">{{ cancelButtonText }}</i-button>
                    <i-button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click.native="handleAction('confirm')">{{ confirmButtonText }}</i-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/babel">
    import Popup from '../../../utils/vue-popup';
    import Input from '../../input';
    import { Button } from '../../button';
    import { addClass, removeClass } from 'wind-dom/src/class';
    import { $t } from '../../../utils/locale';

    let typeMap = {
        success: 'circle-check',
        info: 'information',
        warning: 'warning',
        error: 'circle-cross'
    };

    export default {
        mixins: [Popup],

        props: {
            modal: {
                default: true
            },
            lockScroll: {
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            closeOnClickModal: {
                default: true
            },
            closeOnPressEscape: {
                default: true
            }
        },

        components: {
            'i-input':Input,
            'i-button':Button
        },

        computed: {
            typeClass() {
                return this.type && typeMap[this.type] ? `el-icon-${ typeMap[this.type] }` : '';
            },

            confirmButtonClasses() {
                return `el-button-primary ${ this.confirmButtonClass }`;
            },
            cancelButtonClasses() {
                return `${ this.cancelButtonClass }`;
            }
        },

        methods: {
            doClose() {
                this.value = false;
                this._closing = true;

                this.onClose && this.onClose();

                if (this.lockScroll) {
                    setTimeout(() => {
                        if (this.modal && this.bodyOverflow !== 'hidden') {
                            document.body.style.overflow = this.bodyOverflow;
                            document.body.style.paddingRight = this.bodyPaddingRight;
                        }
                        this.bodyOverflow = null;
                        this.bodyPaddingRight = null;
                    }, 200);
                }
                this.opened = false;

                if (!this.transition) {
                    this.doAfterClose();
                }
            },

            handleAction(action) {
                if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
                    return;
                }
                var callback = this.callback;
                this.value = false;
                callback(action);
            },

            validate() {
                if (this.$type === 'prompt') {
                    var inputPattern = this.inputPattern;
                    if (inputPattern && !inputPattern.test(this.inputValue || '')) {
                        this.editorErrorMessage = this.inputErrorMessage || $t('el.messagebox.error');
                        addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
                        return false;
                    }
                    var inputValidator = this.inputValidator;
                    if (typeof inputValidator === 'function') {
                        var validateResult = inputValidator(this.inputValue);
                        if (validateResult === false) {
                            this.editorErrorMessage = this.inputErrorMessage || $t('el.messagebox.error');
                            addClass(this.$refs.input.$el.querySelector('input'), 'invalid');
                            return false;
                        }
                        if (typeof validateResult === 'string') {
                            this.editorErrorMessage = validateResult;
                            return false;
                        }
                    }
                }
                this.editorErrorMessage = '';
                removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
                return true;
            }
        },

        watch: {
            inputValue(val) {
                if (this.$type === 'prompt' && val !== null) {
                    this.validate();
                }
            },

            value(val) {
                if (this.$type !== 'prompt') return;
                if (val) {
                    setTimeout(() => {
                        if (this.$refs.input && this.$refs.input.$el) {
                            this.$refs.input.$el.querySelector('input').focus();
                        }
                    }, 500);
                } else {
                    this.editorErrorMessage = '';
                    removeClass(this.$refs.input.$el.querySelector('input'), 'invalid');
                }
            }
        },

        data() {
            return {
                title: '',
                message: '',
                type: '',
                showInput: false,
                inputValue: null,
                inputPlaceholder: '',
                inputPattern: null,
                inputValidator: null,
                inputErrorMessage: '',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: $t('el.messagebox.confirm'),
                cancelButtonText: $t('el.messagebox.cancel'),
                confirmButtonClass: '',
                confirmButtonDisabled: false,
                cancelButtonClass: '',

                editorErrorMessage: null,
                callback: null
            };
        }
    };
</script>
