import { Node } from "./node";
import { Eventful } from "../lib/eventful";
import { applyMixins } from "../lib/utils";
import { Collection } from "../lib/collection";

/**
 * NodesCollection is an eventful collection of nodes.
 * 
 * NodesCollection can contains Nodes, Documents and Folder model
 * instances.
 * NodesCollection will trigger various events depending on what is happening
 * with the collection.
 * It can trigger following events:
 * 
 *  * change - when one or multiple nodes are added or removed to/from
 *      the collection
 * 
 */
class NodesCollection extends Collection<Node> {
    add(item_or_items: any): void {
        super.add(item_or_items);
        this.trigger("change");
    }
}

interface NodesCollection extends Eventful {};

applyMixins(NodesCollection, [Eventful]);

export { NodesCollection };