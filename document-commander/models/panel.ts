import { Events } from 'backbone';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";


class Panel {

    parent!: Node;
    nodes: NodesCollection = [];
    dispatcher!: Events;
    
    constructor();
    constructor(nodes: NodesCollection);
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
    }
}

export { Panel };