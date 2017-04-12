import Draggable from './drag'

module.exports = (Vue) => {
    Vue.directive('drag', {
        bind: Draggable
    })
}