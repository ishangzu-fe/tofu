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
import Select from '../pages/select'
import Switch from '../pages/switch'
import Tabs from '../pages/tabs'

let routes = [
    {path: '/',component:Hello},
    {path: '/alert', component:Alert},
    {path: '/affix', component: Affix},
    {path: '/autocomplete', component:AutoComplete},
    {path: '/badge', component:Badge},
    {path: '/button', component:Button},
    {path: '/card', component:Card},
    {path: '/cascader', component:Cascader},
    {path: '/checkbox', component:Checkbox},
    {path: '/datePicker', component:DatePicker},
    {path: '/dropdown-tree', component:DropdownTree},
    {path: '/dialog', component:Dialog},
    {path: '/timePicker', component:TimePicker},
    {path: '/form', component:Form},
    {path: '/input', component:Input},
    {path: '/imgList', component:ImgList},
    {path: '/layout', component:Layout},
    {path: '/message', component:Message},
    {path: '/message-box',component:MessageBox},
    {path: '/select', component:Select},
    {path: '/switch', component:Switch},
    {path: '/tabs', component:Tabs}
]

export default routes;