import { View } from "../lib/view";
import { render as original_render } from "../renderman";
import { urlconf } from "../urls";

import { Breadcrumb } from "../models/breadcrumb";

import {
    EV_FOLDER_CLICKED,
} from "../events";



const DEFAULT_TEMPLATE_NAME = "templates/breadcrumb.html";


class BreadcrumbView extends View {

    get template_name() {
        return this.options['template_name'] || DEFAULT_TEMPLATE_NAME;;
    }

    constructor({
        model=new Breadcrumb(),
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
        this.trigger(EV_FOLDER_CLICKED, node);
    }

    render_to_string() {

        let html_breadcrumb, context = {};

        context['nodes'] = this.model.nodes;
        context['root_url'] = urlconf.root_url();
        html_breadcrumb = original_render(
            this.template_name,
            context
        )

        return html_breadcrumb;
    }
};

export { BreadcrumbView };