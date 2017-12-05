class Item {
    constructor (payload, pre, next, List) {
        this.payload = payload
        this.pre = pre
        this.next = next
    }

    toString () {
        return this.payload.toString()
    }

    set (payload) {
        this.payload = payload
    }

    get () {
        return this.payload
    }

    getPre () {
        return this.pre
    }

    getNext () {
        return this.next
    }
}