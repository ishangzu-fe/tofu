import test from 'ava'

import Vue from 'vue'
import NodeModel from './model/node'
import NodeComponent from './node.vue'

test('Node instance has 3 methods', t => {
    const Node = Vue.extend(NodeComponent)
    const node = new NodeModel({
        label: 'test',
        id: 1
    })
    const nodeComponent = new Node({
        propsData: {
            node
        }
    })

    t.truthy(nodeComponent.$options.methods.expandOrCollapse instanceof Function,
        'Has expandOrCollapse method.')
    t.truthy(nodeComponent.$options.methods.toggle instanceof Function,
        'Has toggle method.')
    t.truthy(nodeComponent.$options.methods.emitCheck instanceof Function,
        'Has emitCheck method.')
})