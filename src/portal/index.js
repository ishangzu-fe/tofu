import sysMenu from './control/menu'
import sysTabMenu from './control/tabbar'
import dropdownUser from './control/dropdown_user'

import CommonServices from '../../services/common';
import Promise from 'es6-promise';

import tpl from './portal.html'
import './portal.scss'

export default{
    template: tpl,

    name: 'portal',

    data(){
        return {
            loading:true,
            menuConfig: {
                useRouter: true,
                menus: []
            },
            tabConfig: {
                useRouter: true,
                autoRestore: true,
                style: {
                    width: '116px'
                }
            },
            userDropdownConfig: {
                dpConfig: {
                    trigger: false
                },
                panelConfig: {
                    avatar: '/static/assets/avatar.50e4091.png',
                    name: 'Gertrude Klein',
                    phone: 13978894856767
                }
            },
            cityData: [
                { name: '杭州', value: 'hangzhou' },
                { name: '南京', value: 'nanjing' },
                { name: '苏州', value: 'suzhou' },
                { name: '上海', value: 'shanghai' }
            ],
            currentCity: '杭州',
            title: 'APP-CMS'
        }
    },

    methods: {
        changeCity (name) {
            if (this.currentCity === name) {
                return;
            }
            this.currentCity = name;
        },

        /**
         * 触发激活菜单的事件时，打开一个Tab
         */
        openTab (menu) {
            let tab = {}
            tab.path = menu.path
            tab.label = menu.label

            sysTabMenu.manager.openTab(tab)
        },

        /**
         * 切换下拉菜单
         */
        switchUserDropdown (status) {
            if (status === 'open') {
                this.userDropdownConfig.dpConfig.trigger = true
            } else {
                this.userDropdownConfig.dpConfig.trigger = false
            }
        },

        extractMenu (menu) {
            this.menuConfig.menus.unshift(this.traverseMenu(menu, menu[0].attributes)[0]);
            console.log(this.menuConfig.menus)
        },

        traverseMenu (arr, prefix) {
            return arr.map(v => {
                let obj = {
                    id: v.id,
                    label: v.text
                }

                if (v.children) {
                    obj.children = this.traverseMenu(v.children, prefix);
                } else {
                    // obj.path = v.attributes.replace(prefix, '/');
                    obj.path = v.attributes;
                }

                return obj
            })
        }
    },

    components: {
        'sys-menu': sysMenu,
        'sys-tab-menu': sysTabMenu.component,
        'sys-dropdown-user': dropdownUser
    },

    beforeRouteEnter (to,from,next) {
        Promise.all([CommonServices.getDict(),CommonServices.getPermission({
            res_category: 'APPCLIENT'
        })]).then(res => {
            if(res[0].code === 0){
                window.dict = res[0].obj;
                console.log(window.dict)
            }

            if(res[1].code === 0){
                window.permission = res[1].obj;
                console.log(window.permission)
            }
            next(vm => {
                vm.loading = false;
            })
        })

    },

    beforeCreate () {
        // 获取菜单并进行转换
        CommonServices.getMenus().then(res => {
            if (res.code === 0) {
                console.log(res.obj)
                this.extractMenu(res.obj);
            } else if (res.code === -9999) {
                this.$message.error(res.msg)
            } else {
                this.$message.error('获取菜单失败！')
            }
        })
    }
}
