import Affix from './components/affix';
import Alert from './components/alert';
import Autocomplete from './components/autocomplete';
import Badge from './components/badge';
import { Button, ButtonGroup } from './components/button';
import Card from './components/card';
import { Checkbox, CheckboxGroup } from './components/checkbox';
import Col from './components/col';
import { DatePicker, TimeSelect, TimePicker } from './components/date-picker';
import Dialog from './components/dialog';
import { Dropdown, DropdownItem, DropdownMenu } from './components/dropdown';
import { Form, FormItem } from './components/form';
import Input from './components/input';
import InputNumber from './components/input-number';
import ImgList from './components/imgList';
import { Loading, LoadingService } from './components/loading';
import LoadingBar from './components/loading-bar';
import Message from './components/message';
import MessageBox from './components/message-box';
import Pagination from './components/pagination';
import Progress from './components/progress';
import { Radio, RadioButton, RadioGroup } from './components/radio';
import Row from './components/row';
import Switch from './components/switch';
import { Select, SelectOption, SelectOptionGroup } from './components/select';
import { SelectTree, SelectTreeOption } from './components/select-tree';
import { Step, Steps } from './components/steps';
import Scrollbar from './components/scrollbar';
import { Table, TableColumn } from './components/table';
import { Tabs, TabPane } from './components/tabs';
import Tag from './components/tag';
import Tooltip from './components/tooltip';
import { Tree, TreeNode } from './components/tree';
import Upload from './components/upload';
import Editor from './components/editor';
import TabMenu from './components/tab-menu';
import Popover from './components/popover';
import Breadcrumb from './components/breadcrumb';

import Cascader from './components/tofu-cascader';
import DropdownTree from './components/tofu-dropdown-tree';
import IMenu from './components/tofu-menu';
import Tabbar from './components/tofu-tabbar';
import FiledFilter from './components/tofu-field-filter';
import Popup from './components/tofu-popup';
import Uploader from './components/tofu-uploader';
import Preview from './components/tofu-preview';
import IUTree from './components/tofu-tree';
import ContextMenu from './components/tofu-context-menu';

import Draggable from './directives/drag/';

import './scss/index.scss';

const install = (Vue) => {
    Vue.component('i-affix',Affix);
    Vue.component('i-alert', Alert);
    Vue.component('i-autocomplete', Autocomplete);
    Vue.component('i-button', Button);
    Vue.component('i-button-group', ButtonGroup);
    Vue.component('i-badge',Badge);
    Vue.component('i-card', Card);
    Vue.component('i-checkbox', Checkbox);
    Vue.component('i-checkbox-group', CheckboxGroup);
    Vue.component('i-col', Col);
    Vue.component('i-date-picker', DatePicker);
    Vue.component('i-time-select', TimeSelect);
    Vue.component('i-time-picker', TimePicker);
    Vue.component('i-dialog', Dialog);
    Vue.component('i-dropdown', Dropdown);
    Vue.component('i-dropdown-item', DropdownItem);
    Vue.component('i-dropdown-menu', DropdownMenu);
    Vue.component('i-form', Form);
    Vue.component('i-form-item', FormItem);
    Vue.component('i-input', Input);
    Vue.component('i-input-number', InputNumber);
    Vue.component('i-img-list',ImgList);
    Vue.component('i-loading-bar', LoadingBar);
    Vue.component('i-pagination', Pagination);
    Vue.component('i-progress', Progress);
    Vue.component('i-radio', Radio);
    Vue.component('i-radio-button', RadioButton);
    Vue.component('i-radio-group', RadioGroup);
    Vue.component('i-row', Row);
    Vue.component('i-select', Select);
    Vue.component('i-option', SelectOption);
    Vue.component('i-option-group', SelectOptionGroup);
    Vue.component('i-select-tree', SelectTree);
    Vue.component('i-select-tree-option', SelectTreeOption);    
    Vue.component('i-scrollbar', Scrollbar);
    Vue.component('i-switch', Switch);
    Vue.component('i-step', Step);
    Vue.component('i-steps', Steps);
    Vue.component('i-table', Table);
    Vue.component('i-table-column', TableColumn);
    Vue.component('i-tabs', Tabs);
    Vue.component('i-tab-pane', TabPane);
    Vue.component('i-tag', Tag);
    Vue.component('i-tooltip', Tooltip);
    Vue.component('i-tree', Tree);
    Vue.component('i-tree-node', TreeNode);
    Vue.component('i-upload', Upload);
    Vue.component('i-popover', Popover);
    Vue.component('i-tab-menu', TabMenu);

    Vue.component('i-cascader', Cascader);
    Vue.component('i-menubar', IMenu);
    Vue.component('i-dropdown-tree', DropdownTree);
    Vue.component('i-popup', Popup);
    Vue.component('i-field-filter', FiledFilter);
    Vue.component('i-uploader', Uploader);
    Vue.component('iu-tree', IUTree);
    Vue.component('i-tabbar', Tabbar);

    Vue.prototype.$message = Message;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$loading = LoadingService;

    Draggable(Vue); // 注册 drag 指令
    Loading.install(Vue);
    Editor.install(Vue);

    Vue.use(Breadcrumb);
};

module.exports = {
    install,
    MessageBox,
    Previewer: Preview,
    ContextMenu:ContextMenu
}