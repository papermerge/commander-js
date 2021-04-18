import { View } from "../view";
import { render as original_render } from "../../renderman";
import {
    Panel,
    Node,
    NodesCollection,
    NodesAction
} from "../../models/index";


class PanelBaseView extends View {

    panel: Panel;
    options: any;
    template_name!: string;
    $el: JQuery<HTMLElement>

    constructor(
        {panel, options}: {
            panel: Panel,
            options?: any
        }
    ) {
        super();
        this.panel = panel;
        this.options = options;
        if (options) {
            this.$el = options['el'];
        } else {
            this.$el = undefined;
        }
    }

    events() {
        let event_map = {
            "node_click": "on_node_clicked",
            "node_selected": "on_node_selected",
            "node_generic_action": "on_node_action"
        };

        return event_map;
    }

    /**
     * Invoked when user clicks a node.
     * 
     * @param {Node} node - currently clicked node  
     */
    on_node_clicked(node: Node) {
        /*
        Node passed as argument was clicked
        */
        if (node.is_document) {
            this.panel.open_document(node);
        } else {  // node is folder
            this.panel.change_parent(node);
        }
    }
    /**
    * Invoked when user selects one or multiple nodes.
    * 
    * @param {Node} node - user's cursors is hovers over this node
    * @param {NodesCollection} nodes - all selected nodes including
    *   one passed as first argument
    */
    on_node_selected(node: Node, nodes: NodesCollection) {
        this.panel.trigger("selection_changed", node, nodes);
    }

    /**
     * Invoked when user triggers an action on one or multiple nodes.
     * 
     * @param {Node} node - User mouse hovers over this node
     * @param {NodesCollection} nodes - All currentl selected nodes
     * @param {NodesAction} action - Action to be executed
     */
    on_node_action(
        {parent_node, current_node, selected_nodes, action}: {
            parent_node?: Node,
            current_node?: Node,
            selected_nodes?: NodesCollection,
            action: NodesAction
        }
    ): void {
        action.run({parent_node, current_node, selected_nodes});
    }

    render_to_string() {

        let html_panel, context: any = {};

        context['nodes'] = this.panel.nodes;
        html_panel = original_render(
            this.template_name,
            context
        )

        return html_panel;
    }

    render(): string {
        let panel_html = this.render_to_string();

        if (this.$el) {
            this.$el.html(panel_html);
        }
        return panel_html; 
    }
};


export { PanelBaseView };
