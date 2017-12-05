class Message {
    constructor (msg, sender, ...attach) {
        this.msg = msg
        this.sender = sender
        this.attach = attach
        this.time = Date.now()
    }
}