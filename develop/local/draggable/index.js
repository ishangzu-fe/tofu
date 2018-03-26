import Draggable from './draggable'

module.exports = (Vue) => {
    Vue.directive('drag', {
        bind: Draggable
    })
}