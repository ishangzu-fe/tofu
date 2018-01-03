const assert = require('assert')
const Vue = require('vue');
const ContextMenuItem = require('../../src/components/context-menu/src/context-menu-item')

describe('测试菜单项组件', () => {
    const propsData = {
        label: 'test',
        // iconURL: String,
        children: [],
        handler() { console.log('this is handler') },
        horDirection: 'left',
        index: 5,
        panelY: 50
    }

    before(() => {
        const Ctor = Vue.extend(ContextMenuItem)
        item = new Ctor({ propsData })
        this.item = item
    })

    it('测试 y 轴计算', () => {
        // 没有子菜单项
        assert(this.item.y, '初始化时计算了 y 值')
        assert(this.item.panelY, '初始化时计算了面板 y 值')
        assert(this.item.y !== this.item.panelY, 'y 值和子项面板 y 值肯定不等')

        const calCorrect = this.item.y === this.item.panelY + 22 * this.item.index + 8
        assert(calCorrect, 'y 值计算不正确')
        assert(!this.item.childrenPanelY, '如果没有子菜单项，那么不会有子菜单面板高度的计算')

        // 如果有子菜单项
        this.item.children = [
            { label: 'child', handler() { console.log('this is child\'s hanlder')} }
        ]
        assert(this.item.childrenPanelY, '如果有子菜单项，就会有子面板的 y 值')
        const childrenHeight = 22 * this.item.children.length + 16;
        const calPYCorrect = this.item.childrenPanelY === this.item.y - childrenHeight + 30;
        assert(calPYCorrect, '子菜单项面板 y 值计算错误')
    })
});
