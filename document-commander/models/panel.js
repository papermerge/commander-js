import { Model } from '../lib/model';
import { Node } from "./node";
import { Collection } from "../lib/collection";
import { fetch_children } from "../requests";


class Panel extends Model {

    constructor({
        nodes,
        parent
    }) {
        super();
        let that = this;
        
        this.parent = parent;
        if (nodes) {
            this.nodes = nodes;
        } else {
            this.nodes = new Collection();
        }

        this.nodes.on("change", function(){ that.trigger("change") } );
    }

    add(node_or_nodes: any) {
        this.nodes.add(node_or_nodes);
    }

    get({
        id,
        title
    }) {
        return this.nodes.get(key);
    }   

    change_parent(parent: Node) {
        let that = this;

        this.parent = parent;
        fetch_children(parent).then(
            (nodes) => {
                that.nodes = nodes;
            }
        );
    }

    open_document(node) {
        throw new Error("Method not implemented.");
    }
}

export { Panel };