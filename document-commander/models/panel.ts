import { Node } from "./node";


class Panel {

    parent: Node
    nodes: Array<Node>
    
    constructor(parent: Node) {
        this.parent = parent;
        this.nodes = []
    }
}