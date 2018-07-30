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

import methodUse from '../pages/methodUse'
import publicPage from '../pages/publicpage'

import Icon from '../pages/hello.vue'
import Grid from '../pages/hello.vue'
import InputNumber from '../pages/hello.vue'
import Mention from '../pages/hello.vue'
import Rate from '../pages/hello.vue'
import Slider from '../pages/hello.vue'
import Transfer from '../pages/hello.vue'
import Upload from '../pages/hello.vue'
import Avatar from '../pages/hello.vue'
import Calendar from '../pages/hello.vue'
import Carousel from '../pages/hello.vue'
import Collapse from '../pages/hello.vue'
import List from '../pages/hello.vue'
import Popover from '../pages/hello.vue'
import Tooltip from '../pages/hello.vue'
import Tag from '../pages/hello.vue'
import Timeline from '../pages/hello.vue'
import Tree from '../pages/hello.vue'
import Breadcrumb from '../pages/hello.vue'
import Dropdown from '../pages/hello.vue'
import Menu from '../pages/hello.vue'
import Pagination from '../pages/hello.vue'
import Steps from '../pages/hello.vue'
import Drawer from '../pages/hello.vue'
import Notification from '../pages/hello.vue'
import Progress from '../pages/hello.vue'
import Popconfirm from '../pages/hello.vue'
import Spin from '../pages/hello.vue'
import Anchor from '../pages/hello.vue'
import BackTop from '../pages/hello.vue'

let routes = [
    { path: '/', component: Hello, name: '欢迎页面' },
    { path: '/methodUse', component: methodUse, name: '使用方法' },
    {
        path: '',
        component: publicPage,
        name: 'General',
        children: [
            { path: '/button', component: Button, name: '按钮' },
            { path: '/icon', component: Icon, name: '图标' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Layout',
        children: [
            { path: '/grid', component: Grid, name: '栅格' }, // 暂缺
            { path: '/layout', component: Layout, name: '布局' },
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Data Entry',
        children: [
            { path: '/autocomplete', component: AutoComplete, name: '自动完成' },
            { path: '/cascader', component: Cascader, name: '级联选择' },
            { path: '/checkbox', component: Checkbox, name: '多选框' },
            { path: '/datePicker', component: DatePicker, name: '日期选择框' },
            { path: '/dropdown-tree', component: DropdownTree, name: '树选择（现役）' },
            { path: '/select-tree', component: SelectTree, name: '树选择' },
            { path: '/timePicker', component: TimePicker, name: '时间选择器' },
            { path: '/form', component: Form, name: '表单' },
            { path: '/input', component: Input, name: '输入框' },
            { path: '/radio', component: Radio, name: '单选框' },
            { path: '/select', component: Select, name: '选择器' },
            { path: '/switch', component: Switch, name: '开关' },
            { path: '/inputNumber', component: InputNumber, name: '数字输入框' }, // 暂缺
            { path: '/', component: Mention, name: '提及' }, // 暂缺
            { path: '/', component: Rate, name: '评分' }, // 暂缺
            { path: '/', component: Slider, name: '滑动输入条' }, // 暂缺
            { path: '/', component: Transfer, name: '穿梭框' }, // 暂缺
            { path: '/', component: Upload, name: '上传' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Data Display',
        children: [
            { path: '/badge', component: Badge, name: '徽标数' },
            { path: '/card', component: Card, name: '卡片' },
            { path: '/imgList', component: ImgList, name: '图片列表' },
            { path: '/tabs', component: Tabs, name: '标签页' },
            { path: '/table', component: Table, name: '表格' },
            { path: '/', component: Avatar, name: '头像' }, // 暂缺
            { path: '/', component: Calendar, name: '日历' }, // 暂缺
            { path: '/', component: Carousel, name: '走马灯' }, // 暂缺
            { path: '/', component: Collapse, name: '折叠面板' }, // 暂缺
            { path: '/', component: List, name: '列表' }, // 暂缺
            { path: '/', component: Popover, name: '气泡卡片' }, // 暂缺
            { path: '/', component: Tooltip, name: '文字提示' }, // 暂缺
            { path: '/', component: Tag, name: '标签' }, // 暂缺
            { path: '/', component: Timeline, name: '时间轴' }, // 暂缺
            { path: '/', component: Tree, name: '树形控件' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Navigation',
        children: [
            { path: '/affix', component: Affix, name: '固钉' },
            { path: '/breadcrumb', component: Breadcrumb, name: '面包屑' }, // 暂缺
            { path: '/dropdown', component: Dropdown, name: '下拉' }, // 暂缺
            { path: '/menu', component: Menu, name: '导航菜单' }, // 暂缺
            { path: '/pagination', component: Pagination, name: '分页' }, // 暂缺
            { path: '/steps', component: Steps, name: '步骤条' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Feedback',
        children: [
            { path: '/alert', component: Alert, name: '警告' },
            { path: '/dialog', component: Dialog, name: '对话框' },
            { path: '/message', component: Message, name: '消息提示' },
            { path: '/message-box', component: MessageBox, name: '弹框' },
            { path: '/', component: Drawer, name: '抽屉' }, // 暂缺
            { path: '/', component: Notification, name: '通知提醒框' }, // 暂缺
            { path: '/', component: Progress, name: '进度条' }, // 暂缺
            { path: '/', component: Popconfirm, name: '气泡确认框' }, // 暂缺
            { path: '/', component: Spin, name: '加载中' }, // 暂缺
        ],
    },
    {
        path: '',
        component: publicPage,
        name: 'Others',
        children: [
            { path: '/', component: Anchor, name: '锚点' }, // 暂缺
            { path: '/', component: BackTop, name: '回到顶部' }, // 暂缺
        ],
    },
]

export default routes;