import Vue from 'vue'
import Tab from './tab.model'

// TODO 组织方式优化

let tm = {}

let defaultTab = new Tab({
    label: '首页',
    path: '/app_service/dashboard'
})

tm.bus = new Vue()
tm._tabs = [{ // TODO 临时处理方式，后期需添加默认 Tab 选项
    _tab_: defaultTab,
    state: { idx: 0, active: true }
}] // tab 列表
tm._activeTabIdx = 0 // 激活的 tab 的索引
tm._mounted = 0
tm._useRouter = false
tm._autoRestore = false // 自动恢复
tm._defaultStyle = { // 默认 tab 样式配置
    width: '165px',
    activeBgc: '#fff',
    inactiveBgc: '#ccc'
}

/**
 * 新增一个 Tab
 *
 * @param {Object}   tab    Tab 实例的构建参数
 * @param {Boolean}  active 是否立即激活
 * @param {Function} cb     回调函数
 */
tm.openTab = function (tab, cb) {
    const idx = tm._tabs.length
    const _tab_ = new Tab(tab)
    const state = {
        idx: tm._tabs.length,
        active: false
    }

    // 如果使用 router，tab 页将与路由一一对应，即一个路由，有且仅有一个tab
    if (tm._useRouter) {
        let idx = tm._tabs.map(v => {
            return v._tab_.path
        }).indexOf(_tab_.path)

        if (idx !== -1) {
            tm.activateTab(idx)
            return
        }
    }

    tm._tabs.push({
        _tab_,
        state
    })

    tm.activateTab(tm._tabs.length - 1)

    cb && cb()
}

/**
 * 移除一个 Tab
 *
 * @param {Number} tabIdx 索引
 */
tm.closeTab = function (tabIdx) {
    const curIdx = tm._activeTabIdx

    tm._tabs.splice(tabIdx, 1)

    let activeIdx =
      curIdx === tm._tabs.length ?
      curIdx - 1 : curIdx
    tm.activateTab(activeIdx)

    tm.reorderTabs()
}

/**
 * 关闭所有 Tab
 *
 * @return {[type]} [description]
 */
tm.closeAllTabs = function () {
    tm._tabs.splice(1)

    if (tm._autoRestore) {
        sessionStorage.setItem('tabs', JSON.stringify(tm._tabs))
    }

    tm.activateTab(0)

    tm.bus.$emit('tm_closeAllTabs')
}

/**
* 使上一个 Tab 失活
*/
tm.unactivateTab = function () {
    let specTab = tm._tabs[tm._activeTabIdx]
    if (specTab) {
        specTab.state.active = false
    }
}

/**
 * 激活指定 Tab
 *
 * @param {Number} tabIdx 索引
 */
tm.activateTab = function (tabIdx) {
    tm.unactivateTab()
    tm._tabs[tabIdx].state.active = true
    tm._activeTabIdx = tabIdx

    if (tm._autoRestore) {
        sessionStorage.setItem('activeTabIdx', JSON.stringify(tm._activeTabIdx))
        sessionStorage.setItem('tabs', JSON.stringify(tm._tabs))
    }

    tm.bus.$emit('tm_change')
}

/**
 * 重新排列 Tabs，更新 Tab 的 idx
 */
tm.reorderTabs = function () {
    tm._tabs.forEach((v, idx) => {
        v.state.idx = idx
    })

    if (tm._autoRestore) {
        sessionStorage.setItem('activeTabIdx', JSON.stringify(tm._activeTabIdx))
        sessionStorage.setItem('tabs', JSON.stringify(tm._tabs))
    }

    tm.bus.$emit('tm_change') // TODO 这一步是否适用于所有场景？
}

tm.restore = () => {
    const _tabs = JSON.parse(sessionStorage.getItem('tabs'))
    const _activeTabIdx = JSON.parse(sessionStorage.getItem('activeTabIdx'))

    if (_tabs) {
        tm._tabs = _tabs
    }
    if (_activeTabIdx) {
        tm._activeTabIdx = _activeTabIdx
    }
    tm._tabs.forEach((v, idx) => {
        if (v._tab_.path === location.pathname) {
            tm.activateTab(idx)
        }
    })

    tm.bus.$emit('tm_change')
}

/**
 * 返回 Tab 实例数组
 *
 * @return {Array<Tab>} _tabs
 */
tm.getTabs = function () {
    return tm._tabs
}

/**
 * 监听'translate'事件
 */
tm.bus.$on('tab_dragend', function (params) { // TODO 优化
    // 检测是否越界
    if (params.from < 0) {
        params.from = 0
    } else if (params.to >= tm._tabs.length) {
        params.to = tm._tabs.length - 1
    }

    let sliceArr
    if (params.from > params.to) {
        sliceArr = tm._tabs.slice(params.to, params.from)
        sliceArr.unshift(tm._tabs[params.from])
        tm._tabs.splice(params.to, sliceArr.length, ...sliceArr)
    } else if (params.from < params.to) {
        sliceArr = tm._tabs.slice(params.from + 1, params.to + 1)
        sliceArr.push(tm._tabs[params.from])
        tm._tabs.splice(params.from, sliceArr.length, ...sliceArr)
    }

    tm._activeTabIdx = params.to // 激活相应的 Tab

    tm.reorderTabs()
})

tm.bus.$on('tab_close', tm.closeTab)
tm.bus.$on('tab_activate', tm.activateTab)
tm.bus.$on('useRouter', () => {
    tm._useRouter = true
})
tm.bus.$on('autoRestore', () => {
    tm._autoRestore = true
})

tm.bus.$on('tab_mounted', () => {
    let mounted = ++tm._mounted

    if (mounted === tm._tabs.length) {
        tm.bus.$emit('tm_allMounted')
    }
})

const exp = (function () {
  let rt = {}
  for (let attr in tm) {
    if (attr.split()[0] !== '_') {
      rt[attr] = tm[attr]
    }
    // else {}
  }
  return rt
})()

export default exp
