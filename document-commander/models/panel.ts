import { Model } from '../lib/model';
import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";
import { fetch_children } from "../requests";


class Panel extends Model {

    parent!: Node;
    nodes: NodesCollection = new NodesCollection();
    
    constructor(
        {nodes, parent}: {
            nodes?: NodesCollection;
            parent?: Node;
        } = {},
    ) {
        super();
        let that = this;
        
        this.parent = parent;
        if (nodes) {
            this.nodes = nodes;
        } else {
            this.nodes = new NodesCollection();
        }

        this.nodes.on("change", function(){ that.trigger("change") } );
    }

    add(node_or_nodes: any) {
        this.nodes.add(node_or_nodes);
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

    open_document(node: Node) {
        throw new Error("Method not implemented.");
    }
}

export { Panel };