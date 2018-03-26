export default class Node {
    constructor (data, parentNode, dict) {
        this._data = data || {}

        // 处理字典，用于设置获取数据时的键值
        dict = dict || {}
        dict['id'] = dict['id'] || 'id'
        dict['label'] = dict['label'] || 'label'

        this.parentNode = parentNode
        if (parentNode) {
            this.level = parentNode.level + 1
        } else {
            this.level = 1
        }

        if (data) {
            this.id = data[dict.id]
            this.label = data[dict.label]
        }
        this.childNodes = []
        this._checked = false
        this._visible = false
        this._expanded = false
        this._hasChildChecked = false
        this._cacheIds = {}
    }
}