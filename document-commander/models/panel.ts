import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";

class Panel {

    parent: Node
    nodes: NodesCollection
    
    constructor(parent: Node, nodes?: NodesCollection) {
        this.parent = parent;
        this.nodes = nodes
    }
}