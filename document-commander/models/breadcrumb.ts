import { Model } from "./model";
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";


class Breadcrumb extends Model {

    nodes: NodesCollection = new NodesCollection();

    constructor(nodes?: NodesCollection) {
        super();
        this.nodes = nodes;
    }

    change_parent(nodes: NodesCollection) {
        this.nodes = nodes;
    }
}

export { Breadcrumb };