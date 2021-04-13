import { Events } from 'backbone';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";
import { fetch_children } from "../requests";


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

    change_parent(parent: Node) {
        let that = this;

        this.parent = parent;
        fetch_children(parent).then(
            (nodes: NodesCollection) => {
                that.nodes = nodes;
            }
        );
    }
}

export { Panel };