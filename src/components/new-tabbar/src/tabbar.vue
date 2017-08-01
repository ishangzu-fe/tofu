<template>
    <div class="tabbar">
        <div class="tabbar-tab-container">
            <Tab
                v-for="tab in tabsInStage"
                :key="tab.id"
                :tab="tab"
                :isFixedWidth="mode === 'panel'"
                :tabWidth="tabWidth"
                :activeId="activeId"
                :hasTabMoving="hasTabMoving"
                @tab-activate="activateTab"
                @tab-destroy="destroyTab"
                @tab-dragstart="onTabDragstart"
                @tab-drag="onTabDrag"
                @tab-dragend="onTabDragend">
            </Tab>
        </div>
        <span
            class="tabbar-store-button tofu-icon icon-more"
            :class="{'store-button-active': showStore}"
            @click.stop="toggleStore"
            v-if="mode === 'right' ? true : (tabsInStore.length ? true : false)">
        </span>
        <div class="tab-store" v-show="showStore"  @click="toggleStore">
            <TabStoreItem
                v-for="tab in tabsInStore"
                :key="tab.id"
                :tab="tab"
                :activeId="activeId"
                @store-activate="activateTab"
                @store-destroy="destroyTab">
            </TabStoreItem>
        </div>
    </div>
</template>

<script>
    import Tab from './tab'
    import TabStoreItem from './tab-store-item'
    import getTabManager from './tab-manager'

    const TabManager = getTabManager()

    export default {
        name: 'tabbar',

        components: {
            Tab,
            TabStoreItem
        },

        data () {
            return {
                mode: 'panel',
                useRouter: true,
                createPos: 'right',

                inited: false, // 用于辨别是否完成初始化
                computedId: 0, // 用于计算 tab 的 id
                tabs: [],
                tabMap: null, // tab 与 id 的映射
                pageCache: [], // 需要缓存的名字的数组，会被暴露出去
                activeId: null,
                tabAmount: null, // 计算出的能生成的 tab 的数量
                tabWidth: null, // 计算出的 tab 的宽度
                movingTabId: null, // 当前拖拽的目标 tab 的 id
                hasTabMoving: false, // 控制 tab 是否设置过渡
                destroyRoute: null, // 用于通知 route 的 watcher 销毁页面实例

                showStore: false // 控制面板的展示
            }
        },

        computed: {
            // 展示的 tab
            tabsInStage () {
                return this.tabs.slice(0, this.tabAmount).map(tab => {
                    tab.stored = false
                    return tab
                })
            },
            // 放在面板里的 tab
            tabsInStore () {
                if (this.mode === 'left') {
                    if (this.tabs.length > this.tabAmount) {
                        return this.tabs.slice(this.tabAmount).reverse().map(tab => {
                            tab.stored = true
                            return tab
                        })
                    } else {
                        return []
                    }
                } else {
                    for (let i = this.tabAmount; i < this.tabs.length; i++) {
                        this.tabs[i].stored = true
                    }
                    return this.tabs.slice(0).reverse()
                }
            }
        },

        watch: {
            // 检测路由的改变
            // tabbar 中会造成路由改变的情况： 1.生成tab 2.激活tab
            '$route' (newRoute, oldRoute) {
                const path = newRoute.path
                const activeTab = this.tabMap.get(this.activeId)
                // 排除重复激活的情况
                if (activeTab.path !== path) {
                    this.tabs.forEach(tab => {
                        if (tab.path === path) {
                            this.activateTab(tab.id)
                        }
                    })
                }
            }
        },

        methods: {
            init (options) {
                if (this.inited) {
                    return
                }

                // 初始化
                this.tabMap = new Map()
                this.computeDemension()

                if (options.mode) this.mode = options.mode
                if (options.useRouter) this.useRouter = options.useRouter
                if (options.createPos) this.createPos = options.createPos

                // 生成默认 tab
                if (options.defaultTab) {
                    this.createTab(Object.assign({}, {fixed: true}, options.defaultTab))
                }
                this.inited = true
            },

            /**
            * 计算 tab 大小及数量
            */
            computeDemension () {
                const marginRight = 6
                const leftPadding = 20
                const panelButtonWidth = 30
                const targetWidth = 100 // 目标宽度，即计算出来的宽度会是小于并且接近于此宽度的
                const initAmount = 10 // 循环计算基数

                const el = this.$el
                const tabbarWidth = el.offsetWidth // tabbar 的宽度

                const computedWidth = tabbarWidth - leftPadding - panelButtonWidth
                this.tabAmount = _getAmount()
                this.tabWidth = (computedWidth / this.tabAmount) - marginRight

                function _getAmount () {
                    let i = initAmount
                    if ((computedWidth / i) > targetWidth) {
                        while ((computedWidth / i) > targetWidth) {
                            i++
                        }
                        return i
                    } else {
                        while ((computedWidth / i) <= targetWidth) {
                            i--
                        }
                        return i + 1
                    }
                }
            },

            /**
            * @param {Object} tab tab数据对象
            */
            createTab (tab) {
                if (this.useRouter && this.$router) {
                    tab.path = tab.path || (tab.route && tab.route.path)

                    let isExists = this.tabs.some(_tab => {
                        return _tab.path === tab.path
                    })

                    this.$router.push((tab.route || tab.path))

                    if (isExists) return // 如果已经存在 Tab，则仅仅激活路由，保证 tab 与路由的映射唯一性

                    // 将 tab 与页面实例绑定
                    const matchedRoutes = this.$router.currentRoute.matched
                    const matchedRoute = matchedRoutes[matchedRoutes.length - 1]
                    const matchedComponent = matchedRoute.components.default
                    const pageName = matchedComponent.name || matchedComponent._Ctor[0].options.name
                    const pageData = matchedComponent.data && matchedComponent.data()
                    if (pageData) {
                        tab.notBindTab = pageData._notBindTab
                    }
                    tab.pageName = pageName
                    if (this.pageCache.indexOf(pageName) === -1) {
                        this.pageCache.push(pageName)
                    }
                    TabManager['cache'] = this.pageCache.join(',')
                }

                // 生成 id
                tab.id = `tab_${tab.label}_${this.computedId++}`
                // 初始化移动量
                tab.moveOffset = 0

                // 根据配置来确定 tab 添加的位置
                if (this.createPos === 'left') {
                    // 需要将新增的 tab 放置默认以及固定 tab 的右侧
                    let idx = this.tabs.length
                    for (let i = 0; i < this.tabs.length; i++) {
                        if (!this.tabs[i].fixed) {
                            idx = i
                            break
                        }
                    }
                    this.insertTab(tab, idx)
                    this.reorderTabs()
                } else if (this.tabAmount && this.tabs.length >= this.tabAmount) { // 如果当前 tabs 数量已经超过限制
                    this.pushAndShift(tab, this.tabAmount, true)
                    this.reorderTabs()
                } else {
                    tab.idx = this.tabs.length
                    this.tabs.push(tab)
                }

                // 添加映射
                this.tabMap.set(tab.id, tab)

                // 激活当前生成的 tab
                this.activeId = tab.id

                // 同步至 sessionStorage
                // 如果没有完成初始化，不同步，因为从 sessionStorage 恢复是初始化之后进行的
                if (this.inited) {
                    this.syncToStorage()
                }
            },

            /**
            * 需区分是否是位于面板中的 tab
            */
            activateTab (tabId) {
                // 防止重复激活
                if (this.activeId === tabId) {
                    return
                }

                this.activeId = tabId
                if (this.mode === 'panel') {
                    let curTab = this.tabMap.get(tabId)
                    if (curTab.stored) {
                        curTab.stored = false

                        // 根据配置来确定 tab 添加的位置
                        if (this.createPos === 'left') {
                            // 需要将新增的 tab 放置默认以及固定 tab 的右侧
                            let idx = 0
                            for (let i = 0; i <= this.tabs.length; i++) {
                                if (!this.tabs[i].fixed) {
                                    idx = i
                                    break
                                }
                            }
                            this.moveTab(curTab, idx)
                            this.reorderTabs()
                        } else {
                            this.pushAndShift(curTab, this.tabAmount)
                            this.reorderTabs()
                        }
                    }
                }

                if (this.useRouter && this.$router) {
                    const path = this.tabMap.get(tabId).path

                    if (this.$route.path !== path) {
                        this.$router.push(path)
                    }
                }

                // 同步至 sessionStorage
                this.syncToStorage()
            },

            /**
            * 不管是在面板中的，还是展示的 tab，行为保持一致，不用区分
            */
            destroyTab (tabId) {
                let tabIdx = this.getTabIdxById(tabId)
                let destroyedTab = this.tabs.splice(tabIdx, 1)[0] // 移除指定 tab
                this.reorderTabs()

                // 处理缓存
                if (this.useRouter) {
                    if (!destroyedTab.notBindTab) {
                        this.pageCache.splice(this.pageCache.indexOf(destroyedTab.pageName), 1)
                        TabManager['cache'] = this.pageCache.join(',')
                    }
                }

                if (tabId === this.activeId) {
                    // 激活相邻 tab
                    if (tabIdx !== 0) {
                        this.activateTab(this.tabs[tabIdx - 1].id)
                    } else if (this.tabs.length) { // 移除 tab 后还有其他 tab
                        this.activateTab(this.tabs[tabIdx].id)
                    }
                }

                // 同步至 sessionStorage
                this.syncToStorage()
            },

            /**
             * 关闭所有 Tab
             */
            destroyAllTabs () {
                this.tabs = [this.tabs[0]]
                this.pageCache = [this.pageCache[0]]
                TabManager['cache'] = this.pageCache.join(',')
                this.activateTab(this.tabs[0].id)
                this.syncToStorage()
            },

            /**
            * 交换 tab 位置
            */
            onTabDrag (offset, tabComponent) {
                const tabWidth = tabComponent.width
                const tabIdx = tabComponent.tab.idx

                const rightBoundary = this.tabs.length - 1
                const leftBoundary = this.getFirstNotFixedTab().idx // 第一个不是固定的 tab 的索引

                // 需要排除边界条件
                // 每个偏移量，都有两种情况
                // 一种是前进，一种是后退
                const gap = 6 // 要算上间距
                if (offset > 0 && tabIdx !== rightBoundary) {
                    if (this.tabs[tabIdx + offset]) this.tabs[tabIdx + offset].moveOffset = -1 * tabWidth - gap
                    if (this.tabs[tabIdx + offset + 1]) this.tabs[tabIdx + offset + 1].moveOffset = 0
                } else if (offset < 0 && tabIdx !== leftBoundary) {
                    if (this.tabs[tabIdx + offset]) this.tabs[tabIdx + offset].moveOffset = tabWidth + gap
                    if (this.tabs[tabIdx + offset - 1]) this.tabs[tabIdx + offset - 1].moveOffset = 0
                } else if (offset === 0) {
                    if (this.tabs[tabIdx + 1]) this.tabs[tabIdx + 1].moveOffset = 0
                    if (this.tabs[tabIdx - 1]) this.tabs[tabIdx - 1].moveOffset = 0
                }
            },

            /**
            * 在拖拽开始时，通知父组件自己开始移动，
            * 同时激活当前 tab
            */
            onTabDragstart (tabComponent) {
                this.activeId = tabComponent.tab.id
                this.movingTabId = tabComponent.tab.id
                this.tabIsMoving = true
                this.hasTabMoving = true
            },

            /**
            * 进行数据的交换，清除所有 tab 的移动量
            */
            onTabDragend (offset, tabComponent) {
                this.movingTabId = null
                this.tabIsMoving = false
                this.hasTabMoving = false
                let curIdx = tabComponent.tab.idx

                const rightBoundary = this.tabs.length >= this.tabAmount ? this.tabAmount - 1 : this.tabs.length - 1
                const leftBoundary = this.getFirstNotFixedTab().idx // 第一个不是固定的 tab 的索引

                // 需要排除边界条件
                if ((offset > 0 && curIdx !== rightBoundary) || (offset < 0 && curIdx !== leftBoundary)) {

                    // 看最终的位置是否超过边界
                    let pos = curIdx + offset
                    if (pos > rightBoundary) {
                        pos = rightBoundary
                    } else if (pos < leftBoundary) {
                        pos = leftBoundary
                    }

                    this.moveTab(this.tabs[curIdx], pos)
                }
                this.reorderTabs(true)
            },

            /**
            * 控制面板的展示
            */
            toggleStore () {
                this.showStore = this.showStore ? false : true
            },

            /**
             * 从 storage 获取数据
             */
            syncFromStorage () {
                return JSON.parse(sessionStorage.getItem('tabData'))
            },

            /**
             * 同步数据至 storage
             */
            syncToStorage () {
                sessionStorage.setItem('tabData', JSON.stringify({
                    pageCache: this.pageCache, // 缓存的页面数组
                    computedId: this.computedId, // 用于生成 id，保证恢复后生成的 id 保持唯一性
                    tabs: this.tabs,
                    activeId: this.activeId
                }))
            },

            /**
             * 恢复数据
             */
            recoverTabs (data) {
                // 恢复 tab
                this.computedId = data.computedId
                this.tabs = data.tabs
                data.tabs.forEach(tab => {
                    // 添加映射
                    this.tabMap.set(tab.id, tab)
                })

                // 恢复页面缓存
                this.pageCache = data.pageCache || []
                TabManager['cache'] = this.pageCache.join(',')

                // 恢复激活状态
                this.$nextTick(() => {
                    this.activateTab(data.activeId)
                    TabManager.emit('inited')
                })
            },

            /**
             * 模拟刷新
             */
            flushTabs () {
                let originData = {}
                originData.tabs = this.tabs.slice(0)
                originData.computedId = this.computedId
                originData.pageCache = this.pageCache
                originData.activeId = this.activeId

                this.destroyAllTabs()
                this.$nextTick(() => {
                    this.recoverTabs(originData)
                })
            },

            /******************** tools *********************/
            getTabIdxById (tabId) {
                return this.tabMap.get(tabId).idx
            },

            /**
            * 重新计算 tab 的索引
            */
            reorderTabs (clearOffset) {
                this.tabs.forEach((tab, idx) => {
                    tab.idx = idx

                    if (clearOffset) {
                        tab.moveOffset = 0
                    }
                })
            },

            /**
            * @param {Number} pos 插入的位置
            */
            insertTab (tab, pos) {
                let tail = this.tabs.slice(pos)
                let head = this.tabs.slice(0, pos)
                this.tabs = head.concat(tab, tail)
            },

            /**
             * 将 tab 插入到显示的队列的尾部
             * 移除头部的一个 tab， 将其添加至隐藏队列的尾部
             */
            pushAndShift (tab, pos, add) {
                if (add) {
                    this.insertTab(tab, pos)
                } else {
                    this.moveTab(tab, pos)
                }

                let idx = this.tabs.length
                for (let i = 0; i < this.tabs.length; i++) {
                    if (!this.tabs[i].fixed) {
                        idx = i
                        break
                    }
                }
                let shiftTab = this.tabs.splice(idx, 1)[0]
                this.tabs.push(shiftTab)
            },

            moveTab (tab, pos) {
                this.tabs.splice(tab.idx, 1)
                this.insertTab(tab, pos)
            },

            getFirstNotFixedTab () {
                let tab
                for (let i = 0; i < this.tabs.length; i++) {
                    if (!this.tabs[i].fixed) {
                        tab = this.tabs[i]
                        break
                    }
                }
                return tab
            }
        },

        mounted () {
            // 当窗口大小改变时，重新计算 tab 的尺寸和数量
            window.onresize = () => {
                this.computeDemension()
            }

            // 与管理器的通讯
            TabManager.on({
                'tab-manager-createTab': this.createTab.bind(this),
                'tab-manager-init': this.init.bind(this),
                'tab-manager-destroyAll': this.destroyAllTabs.bind(this),
                'tab-manager-flush': this.flushTabs.bind(this)
            })
            // 挂载完成后，获取初始化配置进行初始化
            TabManager.emit('tabbar-init')

            // 每次生成都检查 sessionStorage 中是否有存在的数据
            // 有则从 storage 的数据恢复
            let data = this.syncFromStorage()
            if (data) {
                this.recoverTabs(data)
            } else { // 或者在 recover 之后抛出 inited
                TabManager.emit('inited')
            }
        }
    }
</script>

<style lang="scss">
    $tabbar-left-padding: 20px;
    $tabbar-height: 30px;

    $store-button-color-inactive: #fff;
    $store-button-width: 30px;
    $store-button-hover: #313D4F;
    $store-button-active: #14161A;
    $store-width: 140px;

    $tab-border-radius: 2px 2px 0 0;

    .tabbar {
        box-sizing: border-box;
        width: 100%;
        height: $tabbar-height;
        padding-left: $tabbar-left-padding;

        position: relative;

        background: transparent;

        .tabbar-tab-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: $tabbar-left-padding;
            right: $store-button-width;

            background: transparent;
        }

        .tabbar-store-button {
            display: inline-block;
            box-sizing: border-box;
            width: $store-button-width;
            height: $tabbar-height;
            line-height: $tabbar-height;

            position: absolute;
            right: 0;
            bottom: 0;

            color: $store-button-color-inactive;
            font-size: 12px;
            text-align: center;

            border: 1px solid #364357;
            border-bottom: none;
            border-radius: $tab-border-radius;

            background: transparent;

            cursor: pointer;

            &:hover {
                background: $store-button-hover;
            }

            &.store-button-active {
                border: 1px solid transparent;
                background: $store-button-active;
            }
        }

        .tab-store {
            display: inline-block;
            box-sizing: border-box;
            width: $store-width;

            position: absolute;
            right: $store-button-width / 2 - $store-width;
            top: 75%;
            z-index: 3;

            box-shadow: 0 6px 15px 0 rgba(0, 0, 0,.3);
            border-radius: 2px;

            background: #FFFFFF;

            &::after {
                content: '';
                width: 100%;
                height: 100%;

                position: fixed;
                left: 0;
                top: 0;
                z-index: -1;
            }
        }
    }
</style>