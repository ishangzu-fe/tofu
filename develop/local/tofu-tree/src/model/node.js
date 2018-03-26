class Node {
    constructor (data, parentNode) {
        this._data = data

        if (parentNode) {
            (parentNode.childNodes || (parentNode.childNodes = [])).push(this)
            this.parentNode = parentNode
            this.level = parentNode.level
        } else {
            this.parentNode = null
            this.level = 1
        }

        this.id = data[dict.id]
        this.label = data[dict.label]
        this.childNodes = []
        this.checked = false
        this._childNodesCreated = false
    }
}