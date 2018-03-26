<template>
    <div id="tabs">
        <i-button @click.stop="setActive">click</i-button>
        <demo-block title="基础用法" desc="基础用法">
            <i-tabs :active-name="activeName1" ref="tab">
                <i-tab-pane label="用户管理" name="first" :disabled="true">用户管理</i-tab-pane>
                <i-tab-pane label="配置管理" name="second">
                    <i-scrollbar wrap-style="height:300px;">
                        <div style="height:1200px">
                            <div style="height:400px;background:red"></div>
                            <div style="height:400px;background:yellow"></div>
                        </div>
                    </i-scrollbar>
                </i-tab-pane>
                <i-tab-pane label="角色管理" name="third">角色管理</i-tab-pane>
                <i-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</i-tab-pane>
            </i-tabs>
        </demo-block>
    
        <demo-block title="选项卡样式">
            <i-tabs :active-name="activeName2" type="card" :scroll="true" content-height="300px" @tab-click="handleClick">
                <i-tab-pane label='用户管理' name="first">
                    <div style="height:1200px">
                        <div style="height:400px;background:red"></div>
                        <div style="height:400px;background:yellow"></div>
                    </div>
                </i-tab-pane>
                <i-tab-pane label='配置管理' name="second">配置管理</i-tab-pane>
                <i-tab-pane label='角色管理' name="third">角色管理</i-tab-pane>
                <i-tab-pane label='定时任务补偿' name="fourth">定时任务补偿</i-tab-pane>
            </i-tabs>
        </demo-block>
        <demo-block title="卡片化">
            <i-tabs :active-name="activeName2" type="border-card">
                <i-tab-pane label='用户管理' name="first">用户管理</i-tab-pane>
                <i-tab-pane label='配置管理' name="second">配置管理</i-tab-pane>
                <i-tab-pane label='角色管理' name="third">角色管理</i-tab-pane>
                <i-tab-pane label='定时任务补偿' name="fourth">定时任务补偿</i-tab-pane>
            </i-tabs>
        </demo-block>
        <demo-block title="自定义标签页">
            <i-tabs :active-name="activeName2" type="border-card">
                <i-tab-pane name="first">
                    <span slot="label"><i class="el-icon-date" style="margin-right:5px"></i>我的行程</span> 我的行程
                </i-tab-pane>
                <i-tab-pane label='配置管理' name="second">配置管理</i-tab-pane>
                <i-tab-pane label='角色管理' name="third">角色管理</i-tab-pane>
                <i-tab-pane label='定时任务补偿' name="fourth">定时任务补偿</i-tab-pane>
            </i-tabs>
        </demo-block>
        <demo-block title="动态增减标签页">
            <i-tabs :active-name="activeName3" type="card" editable @edit="handleTabsEdit">
                <i-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                    {{item.content}}
                </i-tab-pane>
            </i-tabs>
        </demo-block>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName1: 'second',
                activeName2: 'second',
                activeName3: '2',
                editableTabs: [{
                    title: 'tab 1',
                    name: '1',
                    content: '<i-button>click</i-button>'
                }, {
                    title: 'tab 2',
                    name: '2',
                    content: 'tab 1 content'
                }],
                tabIndex: 2
            }
        },
        methods: {
            setActive() {
                this.$refs.tab.setCurrentName('third')
            },
            handleClick(tab) {
                console.log(tab);
            },
            handleRemove(tab) {
                console.log(tab)
            },
            handleTabsEdit(targetName, action) {
                if (action === 'add') {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: 'New Tab',
                        name: newTabName,
                        content: 'New Tab content'
                    });
                    this.editableTabsValue = newTabName;
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }
    
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                }
            }
        }
    }
</script>

<style>
    .el-tabs-content.is-scroll {
        overflow-y: scroll;
    }
</style>


