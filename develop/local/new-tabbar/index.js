import Tabbar from './src/tabbar'
import getTabManager from './src/tab-manager'

module.exports = function (Vue, options) {
    let tabManager = getTabManager()

    tabManager._init(options)

    Vue.prototype.$tab = tabManager

    Vue.component('v-tabbar', Tabbar)
}