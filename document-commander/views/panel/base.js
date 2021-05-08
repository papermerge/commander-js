import { View } from "symposium";
import { renderman } from "../../renderman";

import {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED,
    EV_NODE_SELECTED,
} from "../../events";


class PanelBaseView extends View {

    get default_options() {
        return {
            'loader_selector': '.loader',
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
    }

    events() {
        // DOM events
        let event_map = {
            "click .node > input[type=checkbox]": "on_node_selected",
            "click .node": "on_node_clicked",
            "click .node.title > a": "on_node_clicked"
        }
        return event_map;
    }

    on_node_selected(event) {
        let current_target = event.currentTarget,
            node_id,
            node,
            new_state,
            parent,
            current_selection;

        // parent is DOM element with .node class,
        // which among others contains the checkbox
        parent = current_target.parentNode;
        if (!parent) {
            console.error(`No parent defined for target ${current_target}`);
            return;
        }

        node_id = parent.dataset.id;
        if (!this.model) {
            return;
        }
        node = this.model.get_node({id: node_id});

        if (!node) {
            console.error(`Node not found for target ${current_target}`);
            return;
        }

        new_state = node.toggle_selection();
        if (new_state) {
            parent.classList.add('checked');
        } else {
            parent.classList.remove('checked');
        }

        current_selection = this.model.get_selection();

        this.trigger(
            EV_NODE_SELECTED,
            {
                node:node,
                selection:current_selection
            }
        );
    }

    on_node_clicked(event) {
        let target = event.currentTarget,
            node_id,
            node;

        if (event.target.type == "checkbox") {
            // user clicked node's checkbox, which is not the concern
            // of current event handler. Instead `on_node_selected`
            // handler will should process this event.
            return;
        }

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

    show_loader() {
        let selector, loader;

        selector = this.options['loader_selector'];
        if (selector) {
            loader = document.querySelector(selector);

            if (loader) {
                loader.style.visibility = 'visible';
            }
        }
    }

    hide_loader() {
        let selector, loader;

        selector = this.options['loader_selector'];
        if (selector) {
            loader = document.querySelector(selector);

            if (loader) {
                loader.style.visibility = 'hidden';
            }
        }
    }

    render_to_string() {

        let html_panel = "",
            context = {};

        if (!this.model) {
            return html_panel;
        }
        context['nodes'] = this.model.nodes;
        html_panel = renderman.render(
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
