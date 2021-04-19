class NodesAction {

    run({
        parent_node,
        current_node,
        selected_nodes
    }) {
        this.parent_node = parent_node;
        this.current_node = current_node;
        this.selected_nodes = selected_nodes;
    };
}

export { NodesAction };