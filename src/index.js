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
import { Loading, LoadingService } from './components/loading';
import LoadingBar from './components/loading-bar';
import Message from './components/message';
import MessageBox from './components/message-box';
import Pagination from './components/pagination';
import Progress from './components/progress';
import { Radio, RadioButton, RadioGroup } from './components/radio';
import Row from './components/row';
import { Select, Option, OptionGroup } from './components/select';
import { Step, Steps } from './components/steps';
import { Table, TableColumn } from './components/table';
import { Tabs, TabPane } from './components/tabs';
import Tag from './components/tag';
import Tooltip from './components/tooltip';
import { Tree, TreeNode } from './components/tree';
import Upload from './components/upload';
import Menu from './components/menu';
import { SelectTree, SelectTreeOption } from './components/select-tree';
import Editor from './components/editor';
import TabMenu from './components/tab-menu';
import Popover from './components/popover';

import Cascader from './components/cascader';
import DropdownTree from './components/dropdown-tree';
import Tabbar from './components/tabbar';
import IMenu from './components/tofu-menu';
import OIcon from './components/tofu-icon';
import OButton from './components/tofu-button';
import OPanel from './components/tofu-panel';
import ODropdown from './components/tofu-dropdown';
import NewTabbar from './components/new-tabbar';
import FiledFilter from './components/field_filter';
import Popup from './components/popup';
import Uploader from './components/uploader';

import Draggable from './directives/drag/';

import './scss/index.scss';

const install = (Vue) => {
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
    Vue.component('i-loading-bar', LoadingBar);
    Vue.component('i-pagination', Pagination);
    Vue.component('i-progress', Progress);
    Vue.component('i-radio', Radio);
    Vue.component('i-radio-button', RadioButton);
    Vue.component('i-radio-group', RadioGroup);
    Vue.component('i-row', Row);
    Vue.component('i-select', Select);
    Vue.component('i-option', Option);
    Vue.component('i-option-group', OptionGroup);
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
    Vue.component('i-select-tree', SelectTree);
    Vue.component('i-select-tree-option', SelectTreeOption);
    Vue.component('i-popover', Popover);
    Vue.component('i-menu', Menu);
    Vue.component('i-tab-menu', TabMenu);

    Vue.component('i-cascader', Cascader);
    Vue.component('i-tabbar', Tabbar.component);
    Vue.component('i-menubar', IMenu);
    Vue.component('i-dropdown-tree', DropdownTree);
    Vue.component('o-icon', OIcon);
    Vue.component('o-button', OButton);
    Vue.component('o-panel', OPanel);
    Vue.component('o-dropdown', ODropdown);
    Vue.component('i-popup', Popup);
    Vue.component('i-field-filter', FiledFilter);
    Vue.component('i-uploader', Uploader);

    Vue.prototype.$message = Message;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$loading = LoadingService;

    Draggable(Vue); // 注册 drag 指令
    Loading.install(Vue);
    Editor.install(Vue);
};

module.exports = {
    install,
    TabManager: Tabbar.manager,
    Tabbar: NewTabbar
}