import { Events } from 'backbone';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";


class Panel {

    parent!: Node;
    nodes: NodesCollection = [];
    dispatcher!: Events;
    
    constructor(
        nodes?: NodesCollection,
        parent?: Node,
        dispatcher?: Events
    ) {
        this.parent = parent;
        if (nodes) {
            this.nodes = nodes;
        } else {
            this.nodes = new NodesCollection();
        }
        
        this.dispatcher = dispatcher;
        this.dispatcher.on("nodes.add", this.nodes_add, this);
        this.dispatcher.on("node.add", this.node_add, this);
    }

    node_add(node: Node) {

    }

    nodes_add(nodes: NodesCollection) {

    }
}

export { Panel };