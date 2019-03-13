# Tofu

！建议下载 tofu-cli 进行初始化

# 更新日志

### 1.0.5
* 修复 table fixed 以后出现2个滚动条
* 修复 table fixed right 以后 right 列消失 BUG
* 修复 radio-group 嵌套后子 group model 会被父 group 重置
* 修复 radio-button 样式

### 1.0.7
* 更新 preview 组件图片可以滚动

### 1.0.9
* 修复 table fixed right 无法 fixed 的问题

### 1.0.10
* 新增 date-picker 组件默认时间功能
```
:default-time="['12:00:00', '23:59:59']"
```
* 新增 table 组件自定义 thead 属性
```
:header-cell-style="{color:'red'}"
:header-cell-class-name="tableheaderClassName"
```
### 1.0.11
* 新增 table 组件 合计 功能
```
 show-summary :summary-method="getSummaries"
```

### 1.0.12
* 新增 preview 组件 `:style` 属性

### 1.0.13
* 修改 tabStoreItem 组件样式

### 1.0.14
* 新增 date-picker 组件 选择时间范围添加 firstDayOfWeek 属性