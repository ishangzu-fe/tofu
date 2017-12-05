import Item from './Item'

class List {
    constructor () {
        this._payload = []
    }

    /**
     * 
     * @param {搜索的数据} data 支持数字、对象、Item
     */
    has (data) {
        if (data === null || data === undefined) {
            return false
        }

        if (data instanceof Item) {
            return this._payload.indexOf(data) !== -1
        } else if (typeof data === 'object') {
            return this._payload.some(item => {
                return item._payload === data
            })
        } else if (typeof data === 'number') {
            return this._length > data
        } else {
            return false
        }
    }

    getItem () {

    }
}