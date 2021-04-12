import { Events } from 'backbone';
import { NodesCollection } from "./nodes_collection";


class Breadcrumb {

    nodes: NodesCollection = [];
    dispatcher!: Events;
    
    constructor();
    constructor(nodes: NodesCollection);
    constructor(
        nodes?: NodesCollection,
        dispatcher?: Events
    ) {
        if (nodes) {
            this.nodes = nodes;
        } else {
            this.nodes = new NodesCollection();
        }
        
        this.dispatcher = dispatcher;
    }
}

export { Breadcrumb };