import { View } from "../../lib/view";
import { render as original_render } from "../../renderman";

import {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED
} from "../../events";


class PanelBaseView extends View {

    get default_options() {
        return {
            'loader': true,
            'el': undefined
        }
    }

    constructor({
        model,
        options={}
    }) {
        super(options);
        this.model = model;
        this.options = Object.assign({}, this.default_options, options);

        this.el = this.options['el'];

        if (this.options['loader']) {
            this.loader = this._create_loader();
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

    _create_loader() {
        if (this.el) {
            div_element = document.createElement("div");
            div_element.classList.add('loader');
            this.el.appendChild(div_element);
            return div_element;
        } else {
            console.log("Cannot create loader. There is nothing to attach to.");
        }
    }

    show_loader() {
        if (this.loader) {
            this.loader.display = 'block';
        }
    }

    hide_loader() {
        if (this.loader) {
            this.loader.display = 'hidden';
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
