export default {
    name: 'cascader-menu',
    props: {
        hasMenu: Boolean,
        showMenu: Boolean,
        options: Array,
        props:Object,
        inputWidth: Number,
        value: Array,
        changeOnSelect: Boolean,
        expandTrigger:String
    },
    data() {
        return {
            activeValue: [],
            cWidth: 0,//容器宽度
            widthArr: []
        };
    },
    computed: {
        activeOptions: {
            get() {
                const activeValue = this.activeValue;
                const props = this.props;
                //依次获取存在选中值的菜单
                let loadActiveOptions = (val, options, activeOptions = []) => {
                    let level = activeOptions.length;
                    activeOptions[level] = options;
                    let active = val[level];
                    if (active) {
                        options = options.filter(option => option[props.value] === active)[0];
                        if (options && options[props.children]) {
                            loadActiveOptions(val, options[props.children], activeOptions);
                        }
                    }
                    return activeOptions;
                }
                return loadActiveOptions(activeValue, this.options);
            }
        }
    },
    watch: {
        showMenu(newVal) {
            if (newVal) {
                this.activeValue = Object.assign([], this.value);
            }
        }
    },
    methods: {
        //子菜单切换
        activeItemChange(item,menuIndex) {
            const len = this.activeOptions.length;
            const props = this.props;
            this.activeValue.splice(menuIndex, len, item[props.value]);
            this.activeOptions.splice(menuIndex + 1, len, item[props.children]);
            if (this.changeOnSelect) {
                //触发即值改变
                this.$emit('pick', this.activeValue, false);
            } else {
                //触发item改变事件
                this.$emit('active-item-change', this.activeValue);
            }
        },
        /**
         * 选择相应值
         * @param item
         * @param menuIndex
         */
        select(item, menuIndex) {
            const props = this.props;
            this.activeValue.splice(menuIndex, this.activeValue.length, item[props.value]);
            this.$emit('pick', this.activeValue);
        },
        /**
         * 菜单关闭
         */
        handleMenuLeave() {
            this.$emit('operateMenu');
        }
    },
    created() {
        this.activeValue = Object.assign([], this.value);//引用会导致最终值跟着菜单选中值改变
    },
    updated() {
        // this.cWidth = 0;
        // this.widthArr = [];
        // for(let i = 0; i < this.$el.children.length; i ++){
        //     this.widthArr.push(this.$el.children[i].offsetWidth);
        // }
    },
    /**
     * 动态生成菜单
     * @param h
     * @returns {boolean}
     */
    render(h) {
        const {
            activeValue,
            activeOptions,
            showMenu,
            hasMenu,
            expandTrigger,
            props,
            inputWidth,
            widthArr,
            cWidth
        } = this;
        // widthArr.forEach(w => {
        //     this.cWidth = this.cWidth + w;
        // });
        //_l:渲染列表
        const menus = this._l(activeOptions, (menu, menuIndex) => {
            //menu:菜单，item:菜单项
            const items = this._l(menu, item => {
                const events = {
                    on: {}
                };
                if (!item.disabled) {
                    if (item[props.children]) {
                        let triggerEvent = {
                            click: 'click',
                            hover: 'mouseenter'
                        }[expandTrigger];
                        events.on[triggerEvent] = () => this.activeItemChange(item, menuIndex);
                    }else{
                        events.on.click = () => this.select(item, menuIndex);
                    }
                }
                if(item[props.children]){
                    return (
                        <li
                            class={{
                                    'cascader-menu-item': true,
                                    'active': item[props.value] === activeValue[menuIndex],
                                    'is-disabled': item.disabled
                                }}
                            {...events}>
                                {item[props.label]}
                                <i class={{
                                        'el-icon-caret-top': true,
                                        'icon-extensible': true
                                    }}></i>
                        </li>
                    );
                }else{
                    return (
                        <li
                            class={{
                                    'cascader-menu-item': true,
                                    'active': item[props.value] === activeValue[menuIndex],
                                    'is-disabled': item.disabled
                                }}
                            {...events}>
                                {item[props.label]}
                        </li>
                    );
                }
            });
            return (
                <ul
                    class={{
                        'cascader-menu': true
                        }}
                    style={{minWidth: inputWidth + 'px' }}>
                        {items}
                </ul>
            );
        });
        if(hasMenu) {
            return (
                <transition name="fade" on-after-leave={this.handleMenuLeave}>
                    <div
                        ref="container"
                        v-show={showMenu}
                        class={{
                                'cascader-menu-container': true,
                            }}
                        >
                            {menus}
                    </div>
                </transition>
            );
        }
    }
}
