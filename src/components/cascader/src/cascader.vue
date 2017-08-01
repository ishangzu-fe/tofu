<template>
    <div class="cascader-container"
         ref="cascader"
        :class="[size ? size : '']">
        <div
            :class="{
                'cascader': true,
                'is-disabled': disabled,
                'focus': isFocus
            }"
             @mouseenter="inputHover = disabled ? false : true"
             @mouseleave="inputHover = false"
             @click.stop="operateMenu">
            <input type="text"
                   :readonly="!filterable"
                   :placeholder="currentLabel && currentLabel.length > 0 ? undefined : placeholder"
                    v-model="inputValue"
                    ref="input"
                    @input="inputChange"
                    @blur="blur"
                    />
            <span class="result-label" v-show="showLabel">
                {{currentLabel}}
            </span>
            <i class="close-btn"
                @click.stop="clear"
                v-show="clearable && inputHover && currentLabel"
                :class="[isBasic ? 'el-icon-circle-close' : 'tofu-icon icon-close-circle']">
            </i>
            <i class="icon-arrow"
                :class="[
                    { 'is-reverse': showMenu},
                    isBasic ? 'el-icon-caret-top' : 'tofu-icon icon-arrow-down'
                ]"
                v-show="!(clearable && inputHover && currentLabel)">
            </i>
        </div>
        <cascader-menu
            :options="options"
            :hasMenu="hasMenu"
            :showMenu="showMenu"
            :props="props"
            :value="currentValue"
            :changeOnSelect="changeOnSelect"
            :expandTrigger="expandTrigger"
            @pick="pick"
            @active-item-change="handleActiveItemChange">
        </cascader-menu>
        <transition name="fade" on-after-leave=handleFMenuLeave>
            <ul class="filterable-menu"
                v-if="filterable"
                :style="{height: searchOptions.length > 0 ? '200px' : '52px'}"
                v-show="showFMenu">
                <li v-if="searchOptions.length <= 0" class="is-disabled">无匹配数据</li>
                <li :class="{'is-disabled': option.disabled}"
                    v-else v-for="option in searchOptions"
                    @click="pick(option.value)">
                    {{option.label}}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    import CascaderMenu from './menu';
    import Emitter from '@/mixins/emitter';

    export default {
        name: 'cascader',
        components: {
            'cascader-menu': CascaderMenu
        },
        mixins: [Emitter],

        props: {
            options: {//菜单选项
                type: Array,
                required: true
            },
            props: {//配置项
                type: Object,
                default() {
                    return {
                        children: 'children',
                        label: 'label',
                        value: 'value',
                        disabled: 'disabled'
                    }
                }
            },
            value: {//用户传来的v-model的默认值
                type: Array,//object,array类型的default必须要用return返回
                default() {
                    return [];
                }
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            disabled: Boolean,//是否禁用
            clearable: {//是否可清空
                type: Boolean,
                default: false
            },
            changeOnSelect: Boolean,//是否可选择任意一级
            expandTrigger: {//如何触发子菜单的展开
                type: String,
                default: 'click'
            },
            filterable: Boolean,//是否可搜索
            showAllLevels: {//是否显示所有级别
                type: Boolean,
                default: true
            },
            size: String,
            isBasic: {//是否用于基本情况下
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                inputHover: false,//鼠标是否经过选择器
                hasMenu: false,//是否存在菜单
                showMenu: false,//是否显示菜单
                inputValue: '',//输入文本值
                inputWidth: 0,//输入框宽度
                showLabel: true,//是否显示选择结果
                searchOptions: [],
                showFMenu: false,
                isFocus: false,//输入框是否进入焦点
                currentValue: this.value ? this.value: ''
            }
        },
        computed: {
            labelKey () {
                return this.props.label || 'label';
            },
            valueKey () {
                return this.props.value || 'value';
            },
            childrenKey () {
                return this.props.children || 'children';
            },
            currentValue() {
                return this.value ? this.value : '';
            },
            //根据值转换为相应的label
            currentLabel () {
                if (!this.currentValue || this.currentValue.length <= 0) {
                    return '';
                }
                let options = this.options;
                let label = this.getLabel(this.currentValue, options);
                return label;
            },
            flattenOptions() {//平级的菜单选项
                const options = this.options;
                const loadFlattenOptions = (flattenOptions = [],
                                            options,
                                            flattenOption = {label: '', value: [], disabled: false}) => {
                    options.forEach(option => {
                        let targetOption = Object.assign({},flattenOption);
                        targetOption.label = targetOption.label + option[this.labelKey] + '/';
                        targetOption.value = targetOption.value.concat(option[this.valueKey]);
                        targetOption.disabled = targetOption.disabled ? targetOption.disabled : option.disabled;
                        if (!this.changeOnSelect) {
                            if (!option[this.childrenKey]) {
                                flattenOptions.push(targetOption);
                            }
                        } else {
                            flattenOptions.push(targetOption);
                        }
                        if (option[this.childrenKey]) {
                            loadFlattenOptions(flattenOptions, option[this.childrenKey],  targetOption);
                        }
                    });
                     return flattenOptions;
                 }
                return loadFlattenOptions([], options).map(v => {
                     v.label = v.label.substring(0, v.label.length - 1);
                     return v;
                });
            }
        },
        watch: {
            currentValue(value) {
                this.dispatch('form-item', 'el.form.change', [value]);
            }
        },
        methods: {
            /**
             * 显示/隐藏菜单
             */
            operateMenu () {
                if (this.disabled || this.inputValue !== ''){
                    return;
                }
                if(this.filterable) {//若用户设置了可搜索，则进入输入框的焦点
                    this.$refs.input.focus();
                    this.isFocus = true;
                }
                this.hasMenu = true;
                if (this.hasMenu){
                    this.showMenu = !this.showMenu;
                }
            },
            hideMenu () {//隐藏菜单
                this.inputValue = '';
                this.showMenu = false;
                this.showLabel = true;
                if (this.showFMenu) {
                    this.showFMenu = false;
                }
            },
            inputChange (ev) {//ev中携带的value值能捕捉到中文未输入完全时的拼音字母
                if (ev.target.value !== '') {
                    this.showLabel = false;
                    this.showMenu = false;
                    this.searchOptions = this.flattenOptions.filter(option => {//搜索字符是否忽略前后空格
                        return option.label.indexOf(ev.target.value.trim()) !== -1;
                    });
                    this.showFMenu = true;
                } else {
                    this.showFMenu = false;
                    this.showMenu = true;
                    this.showLabel = true;
                }
            },
            blur () {
                this.isFocus = false;
            },
            /**
             * 清空
             */
            clear () {
                this.pick([]);
            },
            /**
             * 遍历对比得到相应的label
             * @param value
             * @param options
             * @returns {string}
             */
            getLabel (value, options) {
                let label = '';
                value.forEach(v => {
                    let selectOption = options && options.filter(option => option[this.valueKey] === v)[0];
                    if (selectOption) {
                        label = label + '/' + selectOption[this.labelKey];
                        options = selectOption[this.childrenKey];
                    }
                });
                label = this.showAllLevels ? label.substring(label.indexOf('/') + 1)
                    : label.substring(label.lastIndexOf('/') + 1);
                return label;
            },
            /**
             * 选择值
             * @param val
             * @param closeMenu
             */
            pick (val, closeMenu = true) {
                this.currentValue = val;
                this.$emit('input', val);
                this.$emit('change', val);
                if (closeMenu) {
                    this.hideMenu();
                }
            },
            /**
             * 监听用户绑定的选择item改变事件
             * @param val
             */
            handleActiveItemChange (val) {
                this.$forceUpdate();
                this.$emit('active-item-change', val);
            }
        },
        created () {
            //点击别处隐藏
            document.addEventListener('click', (e) => {
                if (!this.$el.contains(e.target)) {
                    this.hideMenu();
                }
            });
        },
        mounted () {
            this.inputWidth = this.$refs.input.offsetWidth - 2;
        }
    }
</script>

<style lang="scss">
    i {
        font-style:normal;
    }
    .cascader-container {
        position:relative;
        font-size:14px;
        display: inline-block;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;

        .cascader {
            width:200px;
            position:relative;
            cursor:pointer;
            border-radius: 4px;
            border: 1px solid #bfcbd9;
            box-sizing: border-box;
            color: #1f2d3d;
            display: inline-block;
            font-size: inherit;
            height: 36px;
            line-height: 1;
            outline: none;
            &.focus {
                 border: 1px solid #20a0ff;
            }

            &.is-disabled {
                color:#bbb;
                background-color:#EEF1F6;
            }
            input {
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height: 100%;
                margin:0;
                padding:0 35px 0 10px;
                height:100%;
                box-sizing:border-box;
                border:0;
                background-color:transparent;
                outline:none;
            }
            .result-label {
                position:absolute;
                height: 100%;
                line-height:36px;
                left:10px;
                top:0;
                width:calc(100% - 45px);
                text-align:left;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .close-btn,
            .icon-arrow {
                position: absolute;
                right: 0;
                top: 0;
                text-align: center;
                color: #bfcbd9;
                height: 100%;
                line-height: 36px;
                width: 35px;
            }
            .icon-arrow {
                transition: transform .5s;

                &.el-icon-caret-top{
                     transform:rotateZ(180deg);

                    &.is-reverse {
                         transform: rotateZ(360deg);
                    }
                }
                &.is-reverse {
                    transform: rotateZ(180deg);
                }
            }
        }
        .cascader-menu-container,
        .filterable-menu {
            position: absolute;
            text-align: left;
            top: 41px;
            font-size: 14px;
            height: 204px;
            border: 1px solid #d1dbe5;
            border-radius: 2px;
            box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
            z-index:9999;
        }
        .filterable-menu {
            left: 0;
        }
        .cascader-menu-container {
            left:0;
            white-space:nowrap;
        }
        .cascader-menu,
        .filterable-menu {
            display: inline-block;
            vertical-align: top;
            height: 204px;
            overflow: auto;
            border-right: 1px solid #d1dbe5;
            background-color: #fff;
            box-sizing: border-box;
            margin: 0;
            padding: 6px 0;
            min-width: 160px;
        }
        .cascader-menu {
            position: relative;
            border-right: 1px solid #dcdcdc;
            border-radius: 0 2px 2px 0;

            &:last-child {
                 border: 0;
            }
        }
        .filterable-menu {
            min-width: 200px;
            box-shadow: 0 6px 15px 0 rgba(0,0,0,0.30);
            border: 1px solid #CFDBE6;
            box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
            li {
                height: 38px;
                line-height:38px;
                padding: 0 0 0 10px;
            }
        }
        .cascader-menu-item,
        .filterable-menu li {
            text-align: left;
            padding: 8px 30px 8px 10px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #48576a;
            height: 36px;
            line-height: 1.5;
            box-sizing: border-box;
            cursor: pointer;
        }
        .cascader-menu-item:hover,
        .filterable-menu li:hover {
            background:#E4E8F1;
        }
        .cascader-menu-item {
            &.active {
                background-color: #20a0ff;
                color: #fff;

                &:hover {
                     background-color: #1C8DE0;
                }
            }
            &.is-disabled {
                 color: #bfcbd9;
                 background-color: #fff;
                 cursor: not-allowed;
            }
        }
        .filterable-menu li {
            &.is-disabled {
                 color: #bfcbd9;
                 background-color: #fff;
                 cursor: not-allowed;
            }

        }
        .icon-extensible {
            position: absolute;
            right: 10px;
            top: 11px;
            color: #bfcbd9;
            transform: rotateZ(90deg);
        }
    }
    /*尺寸*/
    .small .cascader {
        font-size: 13px !important;
        height: 30px !important;
    }
    .small .result-label,
    .small .close-btn,
    .small .icon-arrow {
        font-size: 13px !important;
        line-height: 30px !important;
    }
    .small .cascader-menu-container,
    .small .filterable-menu{
        top: 35px !important;
    }
    .large .cascader {
        font-size: 16px !important;
        height: 42px !important;
    }
    .large .result-label,
    .large .close-btn,
    .large .icon-arrow {
        font-size: 16px !important;
        line-height: 42px !important;
    }
    .large .cascader-menu-container,
    .large .filterable-menu{
        top: 47px !important;
    }
    .mini .cascader {
        font-size: 12px !important;
        height: 22px !important;
    }
    .mini .result-label,
    .mini .close-btn,
    .mini .icon-arrow{
        font-size: 12px !important;
        line-height: 22px !important;
    }
    .mini .cascader-menu-container,
    .mini .filterable-menu{
        top: 27px !important;
    }
    /*动画*/
    .fade-enter-active, .fade-leave-active {
        transform-origin: center top;
        transition: all .3s cubic-bezier(.55,0,.1,1);
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
        transform: scaleY(0);
    }
    /*placeholder*/
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        opacity:1;
        color: #97A8BE;
    }
　　input:-moz-placeholder, textarea:-moz-placeholder {
        opacity:1;
        color: #97A8BE;
    }
　　input::-moz-placeholder, textarea::-moz-placeholder {
        opacity:1;
        color: #97A8BE;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        opacity:1;
        color: #97A8BE;
    }
</style>


