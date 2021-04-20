import { Model } from '../lib/model';
import { Collection } from "../lib/collection";
import { fetch_children } from "../requests";


const DEFAULT_PANEL = {
    node: new Collection(),
    parent: undefined
}


class Panel extends Model {

    constructor({
        nodes,
        parent
    }=DEFAULT_PANEL) {
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

    add(node_or_nodes) {
        this.nodes.add(node_or_nodes);
    }

    get_node({
        id,
        title
    }) {
        return this.nodes.get({id, title});
    }   

    change_parent(parent) {
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