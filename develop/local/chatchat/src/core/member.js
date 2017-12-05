import { bind } from './utils'

export default class Member {
    constructor(id, center, instance) {
        this.id = id
        this.$room = []
        this.$center = center
        this._componentInstance = instance
    }

    login(roomId) {
        let newRoom = this.$center.login(this, roomId)
        this.$room.push(newRoom)
    }

    send(msg, id, ...attach) {
        // 判断是否已经加入一个房间，若没有则在大厅中发送
        if (this.$room.length) {
            this.$room.forEach(room => {
                room.send(this, msg, id, ...attach)
            })
        } else {
            this.$center.send(this, msg, id, ...attach)
        }
    }

    /**
     * 监听特定消息，设置回调
     * @param {String} msg 
     * @param {Function} cb
     */
    hear (msg, cb) {
        cb = bind(cb, this._componentInstance)

        // 判断是否已经加入一个房间，若没有则在大厅中发送
        if (this.$room.length) {
            this.$room.forEach(room => {
                room.hear(this, msg, cb)
            })
        } else {
            this.$center.hear(this, msg, cb)
        }
    }
}
