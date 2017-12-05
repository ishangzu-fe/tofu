import { Member, Center } from './core'

export default function (Vue) {
    const center = Center()
    Vue.mixin(register(center))
    Vue.protothpe.$center = center
}

function register (center) {
    return {
        mounted () {
            const id = `member_${this.$options._componentTag}_${this._uid}`
            let member = new Member(id, center, this)
            center.register()
        }
    }
}