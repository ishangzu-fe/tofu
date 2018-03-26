class MessageBox {
    constructor () {
        this._messages = []
        this.id = 0
    }

    get messages () {
        return this._messages
    }

    add (message) {
        message.id = this.id++
        this._messages.push(message)
    }
}