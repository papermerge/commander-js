import { Events } from 'backbone';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";


class Panel {

    parent!: Node;
    nodes!: NodesCollection;
    dispatcher!: Events;
    
    constructor(
        parent?: Node,
        nodes?: NodesCollection,
        dispatcher?: Events
    ) {
        this.parent = parent;
        this.nodes = nodes;
        this.dispatcher = dispatcher;
    }
}