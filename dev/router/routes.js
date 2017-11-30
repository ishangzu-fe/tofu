import Hello from '../pages/hello'
import Alert from '../pages/alert'
import Affix from '../pages/affix'
import AutoComplete from '../pages/autocomplete'
import Badge from '../pages/badge'
import Button from '../pages/button'
import Card from '../pages/card'
import Cascader from '../pages/cascader'
import Checkbox from '../pages/checkbox'
import DatePicker from '../pages/datePicker'
import TimePicker from '../pages/timePicker'
import Input from '../pages/input'
import ImgList from '../pages/imgList'
import Layout from '../pages/layout'
import Message from '../pages/message'
import Select from '../pages/select'
import Switch from '../pages/switch'

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
    {path: '/timePicker', component:TimePicker},
    {path: '/input', component:Input},
    {path: '/imgList', component:ImgList},
    {path: '/layout', component:Layout},
    {path: '/message', component:Message},
    {path: '/select', component:Select},
    {path: '/switch', component:Switch}
]

export default routes;