import { NodesCollection } from "./models";
import { Node } from "./models/node";


function fetch_children(node: Node): Promise<NodesCollection> {
    return new Promise<NodesCollection>(resolve => {});
}

export { fetch_children };