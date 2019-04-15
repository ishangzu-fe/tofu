import Alert from '../pages/alert'
import Affix from '../pages/affix'
import AutoComplete from '../pages/autocomplete'
import Badge from '../pages/badge'
import Button from '../pages/button'
import Card from '../pages/card'
import Cascader from '../pages/cascader'
import Checkbox from '../pages/checkbox'
import Dialog from '../pages/dialog'
import DatePicker from '../pages/datePicker'
import DropdownTree from '../pages/dropdownTree'
import Form from '../pages/form'
import TimePicker from '../pages/timePicker'
import Input from '../pages/input'
import ImgList from '../pages/imgList'
import Layout from '../pages/layout.md'
import Message from '../pages/message'
import MessageBox from '../pages/message-box'
import Radio from '../pages/radio'
import Select from '../pages/select'
import SelectTree from '../pages/select-tree'
import Switch from '../pages/switch'
import Tabs from '../pages/tabs'
import Table from '../pages/table'

import publicPage from '../pages/publicpage'

import ChangeLog from '../pages/changelog.md'
import Installation from '../pages/installation.md'
import Quickstart from '../pages/quickstart.md'
import Container from '../pages/layout'
import DateTimePicker from '../pages/dateTimePicker.vue'
import Transfer from '../pages/transfer.vue'

let routes = [
    { path: '/changelog', component: ChangeLog, name: '更新日志' },
    {
        path: '',
        component: publicPage,
        name: '开发指南',
        children: [
            { path: '/installation', component: Installation, name: '安装' },
            { path: '/quickstart', component: Quickstart, name: '快速上手' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Basic',
        children: [
            { path: '/layout', component: Layout, name: '布局' },
            { path: '/container', component: Container, name: '布局容器' },
            { path: '/button', component: Button, name: '按钮' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Form',
        children: [
            { path: '/radio', component: Radio, name: '单选框' },
            { path: '/checkbox', component: Checkbox, name: '多选框' },
            { path: '/input', component: Input, name: '输入框' },
            { path: '/select', component: Select, name: '选择器' },
            { path: '/cascader', component: Cascader, name: '级联选择' },
            { path: '/switch', component: Switch, name: '开关' },
            { path: '/timePicker', component: TimePicker, name: '时间选择器' },
            { path: '/datePicker', component: DatePicker, name: '日期选择框' },
            { path: '/dateTimePicker', component: DateTimePicker, name: '日期时间选择框' },
            { path: '/transfer', component: Transfer, name: '穿梭框' },
            { path: '/form', component: Form, name: '表单' },
            { path: '/autocomplete', component: AutoComplete, name: '自动完成' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Data',
        children: [
            { path: '/table', component: Table, name: '表格' },
            { path: '/dropdown-tree', component: DropdownTree, name: '树选择（现役）' },
            { path: '/select-tree', component: SelectTree, name: '树选择' },
            { path: '/badge', component: Badge, name: '标记' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Notic',
        children: [
            { path: '/alert', component: Alert, name: '警告' },
            { path: '/message', component: Message, name: '消息提示' },
            { path: '/message-box', component: MessageBox, name: '弹框' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Navigation',
        children: [
            { path: '/tabs', component: Tabs, name: '标签页' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Others',
        children: [
            { path: '/dialog', component: Dialog, name: '对话框' },
            { path: '/card', component: Card, name: '卡片' },
            { path: '/imgList', component: ImgList, name: '图片列表' },
            { path: '/affix', component: Affix, name: '固钉' },
        ],
    },
]

export default routes;