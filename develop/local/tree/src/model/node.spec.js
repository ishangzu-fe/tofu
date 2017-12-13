import test from 'ava'

import NodeModel from './node.js'


test('No any arg', t => {
    const instance = new NodeModel()

    t.is(typeof instance._data, 'object', 'Data is {}.')
    t.is(instance.id, undefined, 'Id is undefined.')
    t.is(instance.label, undefined, 'Label is undefined.')    
    t.is(instance.parentNode, undefined, 'ParentNode is undefined.')
    t.is(instance.level, 1, 'Level is 1.')
})
