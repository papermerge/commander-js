import { Node } from "./node";
import { Events } from "../lib/events";
import { applyMixins } from "../lib/utils";
import { Collection } from "../lib/collection";


class NodesCollection extends Collection<Node> {
    add(item_or_items: any): void {
        super.add(item_or_items);
        this.trigger("change");
    }
}

interface NodesCollection extends Events {};

applyMixins(NodesCollection, [Events]);

export { NodesCollection };