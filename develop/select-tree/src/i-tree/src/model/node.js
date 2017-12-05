export default class Node {
    constructor (data, parentNode, dict) {
        this._data = data

        this.parentNode = parentNode
        if (parentNode) {
            this.level = parentNode.level + 1
        } else {
            this.level = 1
        }

        this.id = data[dict.id]
        this.label = data[dict.label]
        this.childNodes = []
        this._checked = false
        this._visible = false
        this._expanded = false
        this._hasChildChecked = false
        this._cacheIds = {}
    }
}