import { View } from "../../lib/view";
import { render as original_render } from "../../renderman";


class PanelBaseView extends View {

    constructor({
        model,
        options
    }) {
        super(options);
        this.model = model;
        this.options = options;
        if (options) {
            this.$el = options['el'];
        } else {
            this.$el = undefined;
        }
    }

    events() {
        let event_map = {
            "click .node": "on_node_clicked"
        }
        return event_map;
    }

    on_node_clicked(event) {
        let $target = $(event.currentTarget),
            node_id,
            node;
        
        node_id = $target.data("id");
        console.log(`node ${node_id} clicked`);
        node = this.panel.get({id: node_id});
        if (node.is_document) {
            this.trigger("document_clicked", node);
        } else {
            this.trigger("folder_clicked", node);
        }
    }

    render_to_string() {

        let html_panel, context = {};

        context['nodes'] = this.panel.nodes;
        html_panel = original_render(
            this.template_name,
            context
        )

        return html_panel;
    }

    render() {
        let panel_html = this.render_to_string();

        if (this.$el) {
            this.$el.html(panel_html);
        }
        return panel_html; 
    }
};


export { PanelBaseView };
