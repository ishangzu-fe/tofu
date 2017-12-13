import Node from 'node'

class NodeStore {
    constructor () {
        this._tree = {}
        this._checkedTrees = {}
    }

    /**
     * 分类型分级缓存节点
     * @param {String} type 
     * @param {Node} node 
     */
    _saveNodes (type, node) {
        switch (type) {
            case 'tree':
                (this._nodes[node.level + ''] 
                || (this._nodes[node.level + ''] = [])).push(node)
                break
            case 'checked':
                (this._checkedNodes[node.level + ''] 
                || (this._checkedNodes[node.level + ''] = [])).push(node)
                break
            case 'actived':
                (this._activedNodes[node.level + ''] 
                || (this._activedNodes[node.level + ''] = [])).push(node)
                break
            default:
                break
        }
    }

    /**
     * 勾选父节点底下所有的子节点
     * @param {Node} parentNode 
     */
    checkNode (parentNode, dict, newV = true) {
        parentNode.checked = newV

        let childNodes = []

        if (!parentNode._childNodesCreated) {
            childNodes = this._createChildNodes(node, dict)
        } else {
            childNodes = parentNode.childNodes
        }

        childNodes.length && traverseBreadth (childNodes, 'childNodes', (node, nextArr) => {
            let hasChecked = node.checked

            node.checked = newV
            this._saveNodes('checked', node)
            if (!node._childNodesCreated) {
                this._createChildNodes(node, dict)
            }

            if (node['childNodes'] && !hasChecked) {
                // 如果节点已经展开，则优先遍历
                if (node.expanded) {
                    nextArr.unshift(...node['childNodes'])
                } else {
                    nextArr.push(...node['childNodes'])
                }
            }
        })

        function traverseBreadth (arr, field, fn) {
            let nextArr = []

            for (let i = 0; i < arr.length; i++) {
                fn && fn.apply(null, arr[i], nextArr)
            }

            nextArr.length && traverseBreadth (nextArr, field, fn)
        }
    }

    /**
     * 取消选中的算法
     * 从当前节点向上遍历
     * 若节点为勾选状态，则取消勾选
     * 若未勾选则停止遍历
     * 若为勾选状态，则遍历节点的子节点，
     * 将其他勾选的节点缓存
     */
    uncheckNode () {

    }

    createNode (data, parentNode) {
        const node = new (data, parentNode)
        this._saveNodes('tree', node) // 创建节点的同时缓存
        return node
    }

    createChildNodes (parentNode, dict) {
        if (parentNode instanceof Node) {
            const childNodesData = parentNode.data[dict.chilNodes]
            let childNodesArr
            childNodesData 
            && childNodesData instanceof Array 
            && (childNodesArr = childNodesData.map(childData => {
                return this.createNode(childData, parentNode)
            }))
            return childNodesArr
        } else {
            return false
        }
    }
}