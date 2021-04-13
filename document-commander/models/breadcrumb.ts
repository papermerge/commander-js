import { Events } from 'backbone';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";


class Breadcrumb extends Events {

    nodes: NodesCollection = [];

    constructor(nodes?: NodesCollection) {
        super();
        this.nodes = nodes;
    }

    change_parent(nodes: NodesCollection) {
        this.nodes = nodes;
    }
}

export { Breadcrumb };