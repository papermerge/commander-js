import { View } from "../../lib/view";
import { render as original_render } from "../../renderman";

import {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED
} from "../../events";


class PanelBaseView extends View {

    constructor({
        model,
        options={}
    }) {
        super(options);
        this.model = model;
        this.options = options;
        if (options) {
            this.el = options['el'];
        } else {
            this.el = undefined;
        }
    }

    events() {
        // DOM events
        let event_map = {
            "click .node": "on_node_clicked",
            "click .node.title > a": "on_node_clicked"
        }
        return event_map;
    }

    on_node_clicked(event) {
        let target = event.currentTarget,
            node_id,
            node;
        
        event.preventDefault();
        // vanilla js equivalent of $(...).data('id');
        node_id = target.dataset.id;
        if (!this.model) {
            return;
        }
        node = this.model.get_node({id: node_id});
        
        if (node.is_document) {
            this.trigger(EV_DOCUMENT_CLICKED, node);
        } else {
            this.trigger(EV_FOLDER_CLICKED, node);
        }
    }

    render_to_string() {

        let html_panel = "",
            context = {};

        if (!this.model) {
            return html_panel;
        }
        context['nodes'] = this.model.nodes;
        html_panel = original_render(
            this.template_name,
            context
        );
        

        return html_panel;
    }

    render() {
        let panel_html = this.render_to_string();

        if (this.el) {
            this.el.innerHTML = panel_html;
        }
        return panel_html; 
    }
};


export { PanelBaseView };
