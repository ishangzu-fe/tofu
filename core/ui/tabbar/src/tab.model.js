export default class Tab {
    constructor ({label, path}) {
        this.id = 'Tab_' + Tab.id++
        this.label = label
        this.path = path
    }
}

Tab.id = 0
