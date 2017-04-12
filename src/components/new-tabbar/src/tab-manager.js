import Vue from 'vue'
import Tabbar from './tabbar.vue'

const getSingleton =  (function () {
    let instance

    return function () {
        if (!instance) {
            instance =  new TabManager()
            return instance
        }

        return instance
    }
})()

class TabManager {
    constructor () {
        this.eventBus = new Vue()
        this._options = {}

        this.eventBus.$on('tabbar-init', this.init.bind(this))
    }

    /**
     * 通过 Vue 的 $emit 方法来进行通讯
     * @param {String} eventName 
     */
    emit (eventName, ...params) {
        this.eventBus.$emit(eventName, ...params)
    }

    /**
     * 通过 Vue 的 $on 方法来进行通讯
     * @param {Object} eventHandlerObject 
     */
    on (eventHandlerObject) {
        for (let eventName of Object.keys(eventHandlerObject)) {
            this.eventBus.$on(eventName, eventHandlerObject[eventName])
        }
    }

    /**
     * 
     * @param {Object} tab Tab数据对象
     */
    createTab (tab) {
        this.emit('tab-manager-createTab', tab)
    }

    init () {
        this.emit('tab-manager-init', this._options)
    }

    /**
     * 在 Vue.use 时调用
     * 初始化配置
     */
    _init (options) {
        this._options = options
    }
}

export default getSingleton
