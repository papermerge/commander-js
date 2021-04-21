import { Model } from '../lib/model';
import { Collection } from "../lib/collection";
import { fetch_children } from "../requests";


const DEFAULT_PANEL = {
    node: new Collection(),
    parent: undefined
}


class Panel extends Model {
    /**
     * Panel is a collection of nodes with common parent (node).
     * 
     * Panel responsability is to manage nodes (Documents and Folder) i.e.
     * add/remove/refresh and notify integrested parties with relevent events.
     * 
     * 
     */
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

    toString() {
        return `Panel(nodes=${this.nodes}, parent=${this.parent})`;
    }

    add(node_or_nodes) {
        // add one or more nodes
        this.nodes.add(node_or_nodes);
    }

    remove(node_or_nodes) {
        // remove one or more nodes
        this.nodes.remove(node_or_nodes);
    }

    get_node({
        id,
        title
    }) {
        return this.nodes.get({id, title});
    }   

    reset({nodes, ancestors}) {
        // empties `this.nodes` collection and fills it anew with
        // provides `nodes`. Existing `this.parent` is replaced
        // with `parent`.
        this.nodes.reset(nodes);
        this.parent = ancestors[0];
    }

}

export { Panel };