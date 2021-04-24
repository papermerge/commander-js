import { Collection } from "../lib/collection";
import { View } from "../lib/view";
import { render as original_render } from "../renderman";
import { root_url } from "../urls";

import {
    EV_DOCUMENT_CLICKED,
} from "../events";



const DEFAULT_TEMPLATE_NAME = "templates/breadcrumb.html";


class BreadcrumbView extends View {

    get template_name() {
        return this.options['template_name'] || DEFAULT_TEMPLATE_NAME;;
    }

    constructor({
        model=new Collection(),
        options={}
    }) {
        super(options);
        this.model = model;
        this.options = options;
        this.el = options['el'];
    }

    events() {
        // DOM events
        let event_map = {
            "click li.item > a": "on_item_clicked",
        }
        return event_map;
    }

    on_item_clicked(event) {
        let target = event.currentTarget,
        node_id,
        node;
    
        event.preventDefault();
        // vanilla js equivalent of $(...).data('id');
        node_id = target.dataset.id;
        
        if (!this.model) {
            return;
        }
        
        node = this.model.nodes.get({id: node_id});
    
        // If user clicked root folder, node will be `undefined`.
        // Root breadcrumb item does not have dataset id attribute set.
        this.trigger(EV_DOCUMENT_CLICKED, node);
    }

    render_to_string() {

        let html_breadcrumb, context = {};

        context['nodes'] = this.model.nodes;
        context['root_url'] = root_url();
        html_breadcrumb = original_render(
            this.template_name,
            context
        )

        return html_breadcrumb;
    }

    render() {
        let breadcrumb_html = this.render_to_string();

        this.el.innerHTML = breadcrumb_html;

        return breadcrumb_html; 
    }
};

export { BreadcrumbView };