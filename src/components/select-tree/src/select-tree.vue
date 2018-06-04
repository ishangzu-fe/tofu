<template>
    <div class="el-select"
         v-clickoutside="handleClose">
        <el-input ref="reference"
                  v-model="selectedLabel"
                  type="text"
                  :placeholder="currentPlaceholder"
                  :name="name"
                  :size="size"
                  :id="id"
                  :disabled="disabled"
                  :validate-event="false"
                  @focus="handleFocus"
                  @click="handleIconClick"
                  :icon="iconClass">
        </el-input>
        <transition name="el-zoom-in-top"
                    @before-enter="handleMenuEnter"
                    @after-leave="doDestroy">
            <el-select-tree-menu ref="popper" v-show="visible && emptyText !== false">
                <el-scrollbar wrap-class="el-select-dropdown-wrap" view-class="el-select-dropdown-list">
                    <slot></slot>
                </el-scrollbar>
                <p class="el-select-tree-dropdown-empty" v-if="emptyText && (options.length === 0)" style="display:none">{{ emptyText }}</p>
            </el-select-tree-menu>
        </transition>
    </div>
</template>

<script type="text/babel">
    import Emitter from '@/mixins/emitter';
    import Locale from '@/mixins/locale';    
    import ElInput from '@/components/input';
    import ElSelectTreeOption from './select-tree-option';
    import ElScrollbar from '@/components/scrollbar';
    import ElSelectTreeMenu from './select-tree-dropdown.vue';
    import debounce from 'throttle-debounce/debounce';
    import Clickoutside from '@/utils/clickoutside';
    import {addClass, removeClass, hasClass} from '@/utils/dom';
    import {addResizeListener, removeResizeListener} from '@/utils/resize-event';
    import {$t} from '@/utils/locale';
    import scrollIntoView from '@/utils/scroll-into-view';
    import {getValueByPath} from '@/utils/util';

    const sizeMap = {
        'large': 42,
        'small': 28,
        'mini': 22
    };

    export default {
        mixins: [Emitter,Locale],

        name: 'ElSelectTree',

        componentName: 'ElSelectTree',

        computed: {
            iconClass() {
                let criteria = this.clearable &&
                    !this.disabled &&
                    this.inputHovering &&
                    !this.multiple &&
                    this.value !== undefined &&
                    this.value !== '';
                return criteria ? 'circle-close is-show-close' : (this.remote && this.filterable ? '' : 'caret-top');
            },

            debounce() {
                return this.remote ? 300 : 0;
            },

            emptyText() {
                if (this.loading) {
                    return this.loadingText || this.$t('el.select.loading');
                } else {
                    if (this.remote && this.query === '' && this.options.length === 0) return false;
                    if (this.filterable && this.options.length > 0 && this.filteredOptionsCount === 0) {
                        return this.noMatchText || this.$t('el.select.noMatch');
                    }
                    if (this.options.length === 0) {
                        return this.noDataText || this.$t('el.select.noData');
                    }
                }
                return null;
            },

            showNewOption() {
                let hasExistingOption = this.options.filter(option => !option.created)
                    .some(option => option.currentLabel === this.query);
                return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
            }
        },

        components: {
            ElSelectTreeOption,
            ElInput,
            ElScrollbar,
            ElSelectTreeMenu,
        },

        directives: {Clickoutside},

        props: {
            name: String,
            value: {
                required: true
            },
            id: String,
            size: String,
            disabled: Boolean,
            placeholder: {
                type: String,
                default() {
                    return $t('el.select.placeholder');
                }
            },
            valueKey: {
                type: String,
                default: 'value'
            }
        },
        
        data() {
            return {
                options: [],
                cachedOptions: [],
                createdLabel: null,
                createdSelected: false,
                selected: [],
                isSelect: true,
                inputLength: 20,
                inputWidth: 0,
                cachedPlaceHolder: '',
                optionsCount: 0,
                filteredOptionsCount: 0,
                visible: false,
                selectedLabel: '',
                hoverIndex: -1,
                query: '',
                optionsAllDisabled: false,
                inputHovering: false,
                currentPlaceholder: ''
            };
        },
        
        watch:{
            visible(val){
                if(!val){
                    this.$refs.reference.$el.querySelector('input').blur();
                    this.handleIconHide();
                    this.broadcast('ElSelectTreeDropdown', 'destroyPopper')
                }else{
                    this.handleIconShow();
                    this.broadcast('ElSelectTreeDropdown', 'updatePopper');
                }
            }
        },
        methods:{
            handleIconHide(){
                let icon = this.$el.querySelector('.el-input-icon');
                if (icon) {
                    removeClass(icon, 'is-reverse');
                }
            },
            handleIconShow(){
                let icon = this.$el.querySelector('.el-input-icon');
                if (icon && !hasClass(icon, 'el-icon-circle-close')) {
                    addClass(icon, 'is-reverse');
                }
            },
            handleClose(){
                this.visible = false;
            },
            handleFocus(){
                this.visible = true;
            },
            handleIconClick(event){
                if(this.iconClass.indexOf('circle-close') > -1){
                    this.deleteSelected(event);
                }else{
                    this.toggleMenu();
                }
            },
            handleMenuEnter(){

            },
            getOption(value){

            },
            resetInputWidth(){
                this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
            },
            handleResize(){
                this.resetInputWidth();
            },
            deleteSelected(event){
                event.stopPropagation();
                this.$emit('input','');
                this.visible = false;
                this.$emit('clear');
            },
            toggleMenu(){
                if(!this.disabled){
                    this.visible = !this.visible;
                }
            },
            doDestroy(){

            }
        },
        created() {
            this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
            // this.$emit('input', []);
            
            // this.debouncedOnInputChange = debounce(this.debounce, () => {
            //     this.onInputChange();
            // });

            // this.$on('handleOptionClick', this.handleOptionSelect);
            // this.$on('onOptionDestroy', this.onOptionDestroy);
            // this.$on('setSelected', this.setSelected);
        },

        mounted() {
            if (Array.isArray(this.value) && this.value.length > 0) {
                this.currentPlaceholder = '';
            }
            addResizeListener(this.$el, this.handleResize);
           
            this.$nextTick(() => {
                if (this.$refs.reference && this.$refs.reference.$el) {
                    this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
                }
            });
            // this.setSelected();
        },

        beforeDestroy() {
            // if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
        }
    };
</script>
