import { Events } from 'backbone';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";


class Panel extends Events {

    parent!: Node;
    nodes: NodesCollection = [];
    
    constructor(
        {nodes, parent}: {
            nodes?: NodesCollection;
            parent?: Node;
        } = {},
    ) {
        super();
        this.parent = parent;
        if (nodes) {
            this.nodes = nodes;
        } else {
            this.nodes = new NodesCollection();
        }
    }

    add(
        {node, nodes}: {
        node?: Node,
        nodes?: NodesCollection
    } = {}
    ) {
        this.nodes.add(node, nodes);
    }
}

export { Panel };