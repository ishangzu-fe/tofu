import Hello from '../pages/hello'
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
import Layout from '../pages/layout'
import Message from '../pages/message'
import MessageBox from '../pages/message-box'
import Radio from '../pages/radio'
import Select from '../pages/select'
import SelectTree from '../pages/select-tree'
import Switch from '../pages/switch'
import Tabs from '../pages/tabs'
import Table from '../pages/table'

import publicPage from '../pages/publicpage'

import ChangeLog from '../pages/changelog'
import Installation from '../pages/installation.vue'
import Quickstart from '../pages/quickstart.vue'
import Icon from '../pages/hello.vue'
import Container from '../pages/hello.vue'
import DateTimePicker from '../pages/dateTimePicker.vue'
import InputNumber from '../pages/hello.vue'
import Rate from '../pages/hello.vue'
import Slider from '../pages/hello.vue'
import Transfer from '../pages/hello.vue'
import Upload from '../pages/hello.vue'
import Carousel from '../pages/hello.vue'
import Collapse from '../pages/hello.vue'
import Tag from '../pages/hello.vue'
import Breadcrumb from '../pages/hello.vue'
import Dropdown from '../pages/hello.vue'
import NavMenu from '../pages/hello.vue'
import Pagination from '../pages/hello.vue'
import Steps from '../pages/hello.vue'
import Notification from '../pages/hello.vue'
import Progress from '../pages/hello.vue'
import Loading from '../pages/hello.vue'

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
            { path: '/container', component: Container, name: '布局容器' }, // 暂缺
            { path: '/icon', component: Icon, name: '图标' }, // 暂缺
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
            { path: '/inputNumber', component: InputNumber, name: '计数器' }, // 暂缺
            { path: '/select', component: Select, name: '选择器' },
            { path: '/cascader', component: Cascader, name: '级联选择' },
            { path: '/switch', component: Switch, name: '开关' },
            { path: '/slider', component: Slider, name: '滑块' }, // 暂缺
            { path: '/timePicker', component: TimePicker, name: '时间选择器' },
            { path: '/datePicker', component: DatePicker, name: '日期选择框' },
            { path: '/dateTimePicker', component: DateTimePicker, name: '日期时间选择框' }, // 暂缺
            { path: '/upload', component: Upload, name: '上传' }, // 暂缺
            { path: '/rate', component: Rate, name: '评分' }, // 暂缺
            { path: '/transfer', component: Transfer, name: '穿梭框' }, // 暂缺
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
            { path: '/tag', component: Tag, name: '标签' }, // 暂缺
            { path: '/progress', component: Progress, name: '进度条' }, // 暂缺
            { path: '/dropdown-tree', component: DropdownTree, name: '树选择（现役）' },
            { path: '/select-tree', component: SelectTree, name: '树选择' },
            { path: '/pagination', component: Pagination, name: '分页' }, // 暂缺
            { path: '/badge', component: Badge, name: '标记' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Notic',
        children: [
            { path: '/alert', component: Alert, name: '警告' },
            { path: '/loading', component: Loading, name: '加载' }, // 暂缺
            { path: '/message', component: Message, name: '消息提示' },
            { path: '/message-box', component: MessageBox, name: '弹框' },
            { path: '/notification', component: Notification, name: '通知' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Navigation',
        children: [
            { path: '/navmenu', component: NavMenu, name: '导航菜单' }, // 暂缺
            { path: '/tabs', component: Tabs, name: '标签页' },
            { path: '/breadcrumb', component: Breadcrumb, name: '面包屑' }, // 暂缺
            { path: '/dropdown', component: Dropdown, name: '下拉' }, // 暂缺
            { path: '/steps', component: Steps, name: '步骤条' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Others',
        children: [
            { path: '/dialog', component: Dialog, name: '对话框' },
            { path: '/card', component: Card, name: '卡片' },
            { path: '/carousel', component: Carousel, name: '走马灯' }, // 暂缺
            { path: '/collapse', component: Collapse, name: '折叠面板' }, // 暂缺
            { path: '/imgList', component: ImgList, name: '图片列表' },
            { path: '/affix', component: Affix, name: '固钉' },
        ],
    },
]

export default routes;