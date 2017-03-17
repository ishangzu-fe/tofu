import Node from './node';

export default class Tree{
    constructor(options){
        for(let option in options){
            if(options.hasOwnProperty(option)){
                this[option] = options[option];
            }
        }

        this.nodesMap = {};

        this.root = new Node({
            data:this.data,
            _tree:this
        });

    }

    registerNode(node){
        const key = this.key;
        if(!key || !node || !node.data) return;

        this.nodesMap[node.key] = node;
    }

    deregisterNode(node){
        const key = this.key;
        if(!key || !node || !node.data) return;

        delete this.nodesMap[node.key];
    }
}