import { Node } from "./node";
import { NodesCollection } from "./nodes_collection";

/**
 * User action to be executed on one or multiple Nodes.
 * There may be actions which are not related to any specific node(s).
 * 
 * Example of actions:
 *  - rename a node (maybe multirename? ) 
 *  - deleted one or multiple node 
 *  - new folder (not related directly to any node, need to know parent node)
 *  - download
 *  - ... 
 * @class
 */
class NodesAction {

    run(
        {parent_node, current_node, selected_nodes}:{
            parent_node?: Node,
            current_node?: Node,
            selected_nodes?: NodesCollection
        }
    ): void {

    };
}

export { NodesAction };