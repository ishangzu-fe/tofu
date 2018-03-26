import Vue from 'vue';
import ContextMenuComponent from './src/context-menu';

const ContextMenu = Vue.extend(ContextMenuComponent);
ContextMenu.install = function(Ctor) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const CMInstance = new ContextMenu({ el: div });
    Ctor.prototype.$showContextMenu = CMInstance.show;
}

module.exports = ContextMenu;